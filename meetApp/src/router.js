import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionControlller from './app/controllers/SessionControlller';
import authMiddleare from './app/middleware/auth';

const routes = new Router();
routes.post('/sessions', SessionControlller.store);
routes.post('/users', UserController.store);

routes.use(authMiddleare);
routes.put('/users', UserController.update);
export default routes;
