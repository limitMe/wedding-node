import {Context} from "koa";
import {getManager} from "typeorm";
import User from "../model/user";

/**
 * Loads all users from the database.
 */
export async function getAllAction(context: Context) {
  const userRepository = getManager().getRepository(User);

  const users = await userRepository.find();

  context.body = users;
}

/**
 * Create a user to the database.
 */
export async function createAction(context: Context) {
  const userRepository = getManager().getRepository(User);

  const newUser = userRepository.create();

  newUser.name = '钟典';
  newUser.constellation = '射手座';
  newUser.pair = '李庆渝';
  newUser.character1 = '乐善好施';
  newUser.character2 = '帅气逼人';
  newUser.character3 = '简直不摆了';

  await userRepository.save(newUser);

  context.body = newUser;
}