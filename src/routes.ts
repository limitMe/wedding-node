import { main, answer, activateToken, allNames } from './controller/home';
import { init, reset, pair } from './controller/super';
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
    path: '/allNames',
    method: 'get',
    action: allNames
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
    path: '/super/pair',
    method: 'post',
    action: pair
  },
  {
    path: '/admin',
    method: 'get',
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
