import { main, answer, activateToken } from './controller/home';
import { init, reset } from './controller/super';
import { admin, turnOn, turnOff } from './controller/admin';

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
    method: 'post',
    action: init
  },
  {
    path: '/super/reset',
    method: 'post',
    action: reset
  },
  {
    path: '/admin',
    method: 'post',
    action: admin
  },
  {
    path: '/admin/turnon',
    method: 'post',
    action: turnOn
  },
  {
    path: '/admin/turnoff',
    method: 'post',
    action: turnOff
  },
];
