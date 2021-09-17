import {Context} from "koa";
import {getManager} from "typeorm";
import User from "../model/user";

/**
 * Loads all users from the database.
 */
export async function getAllAction(ctx: Context) {
  const userRepository = getManager().getRepository(User);

  const users = await userRepository.find();

  ctx.body = users;
}

/**
 * Create a user to the database.
 */
export async function createAction(ctx: Context) {
  const userRepository = getManager().getRepository(User);

  const newUser = userRepository.create();

  newUser.name = '钟典';
  newUser.constellation = '射手座';
  newUser.pair = '李庆渝';
  newUser.character1 = '乐善好施';
  newUser.character2 = '帅气逼人';
  newUser.character3 = '简直不摆了';

  await userRepository.save(newUser);

  ctx.body = newUser;
}

export async function test(ctx: Context) {
  ctx.body = {
    request: ctx.request
  };
}