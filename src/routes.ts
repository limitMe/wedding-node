import { getAllAction, createAction } from './controller/home';
import { init, reset } from './controller/super';

export default [
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
