import { Context } from "koa";
import { getManager } from "typeorm";
import User from "../model/user";
import Token from "../model/token";
const Excel = require('exceljs');

/**
 * Init
 */
export async function init(ctx: Context) {
  if (ctx.superMode !== true) {
    ctx.body = {
      success: false,
      code: 402
    }
    return
  }

  const userRepository = getManager().getRepository(User);
  const tokenRepository = getManager().getRepository(Token);

  console.log('Deleting old users');
  const allUsers = await userRepository.find();
  for await (const user of allUsers) {
    userRepository.delete(user);
  }
  console.log('Deleting old tokens');
  const allTokens = await tokenRepository.find();
  for await (const token of allTokens) {
    tokenRepository.delete(token);
  }
  console.log('All deleted');

  let tokenInserted = 1;
  let userInserted = 1;

  const workbookReader = new Excel.stream.xlsx.WorkbookReader('/Users/zhongdian/Downloads/input.xlsx');
  for await (const worksheetReader of workbookReader) {
    if (worksheetReader.name === '线索特征') {
      for await (const row of worksheetReader) {
        if (row._number === 1) {
          continue
        }
        if (row.values[1] !== undefined){
          console.log(`${userInserted}user inserting: %j`, row.values);
          const newUser = userRepository.create();
          newUser.name = row.values[1];
          newUser.constellation = row.values[2];
          newUser.character1 = row.values[3] ?? 'delete this code on prod';
          newUser.character2 = row.values[4] ?? 'delete this code on prod';
          newUser.character3 = row.values[5] ?? 'delete this code on prod';
          newUser.pair = row.values[6];
          await userRepository.save(newUser);
          userInserted += 1;
        }
      }
    } else if (worksheetReader.name === '通关口令') {
      for await (const row of worksheetReader) {
        if (row._number === 1) {
          continue
        }
        if (row.values[1] !== undefined && !isNaN(row.values[2])){
          console.log(`${tokenInserted} token inserting: %j`, row.values);
          const newToken = tokenRepository.create();
          newToken.token = row.values[1].replace(/[，,。;\.\s]/g, '');
          newToken.forCharacter = row.values[2];
          await tokenRepository.save(newToken);
          tokenInserted += 1;
        }
      }
    }
  }

  const result = {
    userInserted: userInserted - 1,
    tokenInserted: tokenInserted - 1
  }

  ctx.body = result;
}

/**
 * Reset
 */
export async function reset(ctx: Context) {
  if (ctx.superMode !== true) {
    ctx.body = {
      success: false,
      code: 402
    }
    return
  }

  const userRepository = getManager().getRepository(User);
  const tokenRepository = getManager().getRepository(Token);

  let tokenUpdated = 1;
  let userUpdated = 1;

  console.log('Starting reset. Note reset would affect users constellation!');

  const allUsers = await userRepository.find();
  for await (const user of allUsers) {
    console.log(`${userUpdated}: Updating ${user.name}`)
    user.character1Revealed = true;
    user.character2Revealed = false;
    user.character3Revealed = false;
    user.answer1 = '';
    user.answer2 = '';
    user.goldenNum = 0;
    user.silverNum = 0;
    user.goldenTimestamp = 0;
    user.silverTimestamp = 0;
    userRepository.save(user);
    userUpdated += 1;
  }

  const allTokens = await tokenRepository.find();
  for await (const token of allTokens) {
    console.log(`${tokenUpdated}: Updating token`)
    token.usedBy = '';
    token.usedTimestamp = 0;
    tokenRepository.save(token);
    tokenUpdated += 1;
  }

  const result = {
    userUpdated: userUpdated - 1,
    tokenUpdated: tokenUpdated - 1
  }

  ctx.body = result;
}