import { getAllAction, createAction } from './controller/home';

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
  }
];
