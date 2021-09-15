import { getAllAction } from './controller/home';

export default [
  {
    path: '/',
    method: 'get',
    action: getAllAction
  }
];
