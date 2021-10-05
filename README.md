# 婚礼猜来宾游戏后端

**Backend for Wedding Game - Guest Guess**

前端项目地址：https://github.com/limitMe/wedding-react

Paired with: https://github.com/limitMe/wedding-react

每位到场我们婚礼的客人，可以通过自己的姓名+星座组合，进入游戏。游戏初始化时，为所有来宾随机分配了另一位来宾作为配对。来宾进入游戏后可以看到匹配对象的线索，通过输入口令解锁更多线索后，输入最终答案，正确的可以参与抽奖。集齐全部线索的，也可以抽奖。

Every guest who came to our wedding ceremony, can log in this game using his or her name and constellation. We'll assign a pair to all guests when this game is initing. After guest logs in, he or her can see one clue of his/her pair. Guest can win a reward either by unlocking all clues by input certain tokens or answer the right pair name.



## 如何运行 How to run

生产环境运行代码未经很好的验证，建议使用`npm install` + `npm run start`

This repo has issues when running as production. Just use `npm run start` after `npm install`.

需要自行配置一个空的MySQL数据库，将连接所需要使用的信息填入`ormconfig.json`

You need an empty MySQL database, fill all necessary info into `ormconfig.json`



## 可优化点 Improvements to make

- 权限验证采用了极其简单的静态文本比对，建议改进 Currently I used a simple static string compare machanism to auth requests. It requires improvements.

- 游戏开始和结束的标志，挂载到了app上，这样做会在多线程下产生问题 The flag marking whether the game is on is attached to Koa App. It will cause trouble when you run the app on multithreads.