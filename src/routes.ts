import { main, answer, activateToken } from './controller/home';
import { init, reset } from './controller/super';

export default [
  {
    path: '/answer',
    method: 'post',
    action: answer
  },
  {
    path: '/activateToken',
    method: 'post',
    action: activateToken
  },
  {
    path: '/',
    method: 'get',
    action: main
  },
  {
    path: '/super/init',
    method: 'get',
    action: init
  },
  {
    path: '/super/reset',
    method: 'get',
    action: reset
  },
];
