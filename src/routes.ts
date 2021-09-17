import { getAllAction, createAction, test } from './controller/home';
import { init, reset } from './controller/super';

export default [
  {
    path: '/test',
    method: 'get',
    action: test
  },
  {
    path: '/all',
    method: 'get',
    action: getAllAction
  },
  {
    path: '/new',
    method: 'get',
    action: createAction
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
