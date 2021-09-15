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