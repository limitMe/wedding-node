import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import 'reflect-metadata';
import { createConnection, getManager } from "typeorm";
import { PORT } from './config';
import AppRoutes from './routes';
import { auth } from './middleware/auth';
import Setting from './model/setting';

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection().then(async connection => {

  // create koa app
  const app = new Koa();
  const router = new Router();

  const settingRepository = getManager().getRepository(Setting);
  const onlySetting: Setting = await settingRepository.findOne({id: 1});
  if (onlySetting === undefined) {
    const newSetting = settingRepository.create();
    newSetting.gameOn = true;
    settingRepository.save(newSetting);
  }
  // @ts-ignore
  app.gameOn = onlySetting ? onlySetting.gameOn: true;

  app.use(auth);

  //路由
  AppRoutes.forEach(route => router[route.method](route.path, route.action));

  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(PORT);

  console.log(`应用启动成功 端口:${PORT}`);
}).catch(error => console.log("TypeORM connection error: ", error));


