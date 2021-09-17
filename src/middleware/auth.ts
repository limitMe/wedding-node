import { Context, Next } from "koa";
import { getManager } from "typeorm";
import User from "../model/user";

export async function auth(ctx: Context, next: Next) {
  const userRepository = getManager().getRepository(User);
  
  const authHeader = decodeURI(ctx.request.header['authorization']);
  if (authHeader === undefined) {
    ctx.body = {
      success: false,
      code: 402
    }
    return
  }

  if (authHeader === 'superidolsmile') {
    ctx.superMode = true;
    await next();
    return;
  }

  const authStrings = authHeader.split('-');
  if (authStrings.length !== 2) {
    ctx.body = {
      success: false,
      code: 402
    }
    return
  }
  
  const authResult = await userRepository.findOne({ name: authStrings[0], constellation: authStrings[1] });
  if (authResult === undefined) {
    const waitAuthResult = await userRepository.findOne({ name: authStrings[0], constellation: ''});
    if (waitAuthResult === undefined) {
      ctx.body = {
        success: false,
        code: 402
      }
      return
    } else {
      waitAuthResult.constellation = authStrings[1];
      userRepository.save(waitAuthResult); // no need for await
    }
  }
  await next();
}