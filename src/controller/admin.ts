import { Context } from "koa";
import { getManager, Not } from "typeorm";
import User from "../model/user";
import Token from "../model/token";

export async function admin(ctx: Context) {
  if (ctx.adminMode !== true) {
    ctx.body = {
      success: false,
      code: 402
    }
    return
  }

  const userRepository = getManager().getRepository(User);
  const [goldenResults, totalGoldenNum] = await userRepository.findAndCount({where: { goldenNum: Not(0)}})
  const goldenWinners = goldenResults
    .sort((a, b) => { return a.goldenTimestamp > b.goldenTimestamp ? 1: 0})
    .map(winner => {
      return {
        name: winner.name,
        number: winner.goldenNum,
        correctAnswer: winner.pair,
        answer1: winner.answer1,
        answer2: winner.answer2
      }
    });
  const [silverResults, totalSilverNum] = await userRepository.findAndCount({where: { silverNum: Not(0)}})
  const silverWinners = silverResults
    .sort((a, b) => { return a.silverTimestamp > b.silverTimestamp ? 1: 0})
    .map(winner => {
      return {
        name: winner.name,
        number: winner.silverNum,
        correctAnswer: winner.pair,
        answer1: winner.answer1,
        answer2: winner.answer2
      }
    });
  // Means guests who won't get any rewards
  const peipaoGuests = (await userRepository.find({ goldenNum: 0, silverNum: 0 }))
    .map(guest => {
      return {
        name: guest.name,
        correctAnswer: guest.pair,
        answer1: guest.answer1,
        answer2: guest.answer2,
        character2Revealed: guest.character2Revealed,
        character3Revealed: guest.character3Revealed
      }
    })

    const tokenRepository = getManager().getRepository(Token);
    const [, leftToken2] = await tokenRepository.findAndCount({usedBy: '', forCharacter: 2});
    const [, leftToken3] = await tokenRepository.findAndCount({usedBy: '', forCharacter: 3});
  
    ctx.body = {
      success: true,
      totalGoldenNum,
      totalSilverNum,
      goldenWinners,
      silverWinners,
      peipaoGuests,
      leftToken2,
      leftToken3
    };

}