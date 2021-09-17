import {Context} from "koa";
import {getManager, Not} from "typeorm";
import User from "../model/user";
import Token from '../model/token';

export async function main(ctx: Context) {
  let result: any = {
    success: false,
    authString: ctx.request.header['authorization'], // should be the same to auth middleware
  };

  const userRepository = getManager().getRepository(User);
  const currentUser: User = ctx.currentUser;
  const pair = currentUser.pair;
  const pairUser = await userRepository.findOne({ name: pair });
  result = {
    ...result,
    success: true,
    character1: currentUser.character1Revealed ? pairUser.character1: '',
    character2: currentUser.character2Revealed ? pairUser.character2: '',
    character3: currentUser.character3Revealed ? pairUser.character3: '',
    chanceUsedUp: currentUser.answer1 !== '' && currentUser.answer2 !== '',
    silverNum: currentUser.silverNum,
    goldenNum: currentUser.goldenNum,
  };

  ctx.body = result;
}

export async function answer(ctx: Context) {
  let result: any = {
    success: false
  };
  //@ts-ignore
  if (ctx.app.gameOn !== true) {
    result = {
      ...result,
      message: '游戏尚未开始或者已经结束'
    };
    ctx.body = result;
    return;
  }
  const newAnswer = ctx.request.body.answer ?? '';
  const currentUser: User = ctx.currentUser;
  const answeredOnce = currentUser.answer1 !== '';

  if (answeredOnce && currentUser.answer2 !== '') {
    result = {
      ...result,
      message: '已用掉所有回答机会'
    };
    ctx.body = result;
    return;
  } else if (answeredOnce && currentUser.answer1 === currentUser.pair) {
    result = {
      ...result,
      message: '已有正确答案'
    };
    ctx.body = result;
    return;
  } else if (currentUser.answer1 === newAnswer) {
    result = {
      ...result,
      message: '咋不信邪，都给你说了这是错误答案'
    };
    ctx.body = result;
    return;
  }

  const userRepository = getManager().getRepository(User);
  if (newAnswer !== currentUser.pair) {
    result = {
      ...result,
      message: '回答错误'
    }
    if (answeredOnce) {
      currentUser.answer2 = newAnswer;
    } else {
      currentUser.answer1 = newAnswer;
    }
    userRepository.save(currentUser); // async
    ctx.body = result;
    return;
  }
  
  const [, currentGoldenNum] = await userRepository.findAndCount({where: { goldenNum: Not(0)}});
  if (answeredOnce) {
    currentUser.answer2 = newAnswer;
  } else {
    currentUser.answer1 = newAnswer;
  }
  currentUser.goldenNum = currentGoldenNum + 1;
  currentUser.goldenTimestamp = Date.now();
  userRepository.save(currentUser); // async
  result = {
    ...result,
    success: true,
    message: '回答正确'
  };
  ctx.body = result;
  return;
}

export async function activateToken(ctx: Context) {
  let result: any = {
    success: false
  };

  //@ts-ignore
  if (ctx.app.gameOn !== true) {
    result = {
      ...result,
      message: '游戏尚未开始或者已经结束'
    };
    ctx.body = result;
    return;
  }

  const currentUser: User = ctx.currentUser;
  const userRepository = getManager().getRepository(User);
  const rawToken = ctx.request.body.token ?? '';
  const token = rawToken.replace(/[，,。;\.\s]/g, ''); // same to init
  const tokenRepository = getManager().getRepository(Token);
  const tokenResult = await tokenRepository.findOne({token});
  if (tokenResult === undefined) {
    result = {
      ...result,
      message: '口令输入错误'
    }
    ctx.body = result;
    return;
  }

  if (tokenResult.usedBy !== '') {
    result = {
      ...result,
      message: '口令已被使用'
    }
    ctx.body = result;
    return;
  }

  if ((tokenResult.forCharacter === 1 && currentUser.character1Revealed) ||
      (tokenResult.forCharacter === 2 && currentUser.character2Revealed) ||
      (tokenResult.forCharacter === 3 && currentUser.character3Revealed)) {
    result = {
      ...result,
      message: '该口令可以解锁的线索你已经知道了'
    }
    ctx.body = result;
    return;
  }

  tokenResult.usedBy = currentUser.name;
  tokenResult.usedTimestamp = Date.now();
  switch(tokenResult.forCharacter) {
    case 1: currentUser.character1Revealed = true; break;
    case 2: currentUser.character2Revealed = true; break;
    case 3: currentUser.character3Revealed = true; break;
    default: break;
  }

  if (currentUser.character1Revealed &&
      currentUser.character2Revealed &&
      currentUser.character3Revealed) {
        const [, currentSilverNum] = await userRepository.findAndCount({where: { SilverNum: Not(0)}});
        currentUser.silverNum = currentSilverNum + 1;
        currentUser.silverTimestamp = Date.now();
      }

  userRepository.save(currentUser); // async
  tokenRepository.save(tokenResult); // async

  result = {
    ...result,
    success: true,
    message: '解锁新线索'
  }
  ctx.body = result;  
}