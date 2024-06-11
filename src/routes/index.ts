import { NextFunction, Request, Response, Router } from 'express';

import { router as AccountRouter } from './account.route';
import { router as AuthRouter } from './auth.route';
import { router as ToDoRouter } from './todo-list.route';

const _router: Router = Router({
    mergeParams: true,
});

//DEFINE API VERSION
_router.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Api-Version', 'v1');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// HEALTHCHECK
_router.route('/health-check').get(function (req: Request, res: Response) {
    return res.status(200).json({ healthy: true, version: 'v1' });
});

//EXPORT ROUTES WITH BASEPATH
_router.use('/Auth', AuthRouter);
_router.use('/Account', AccountRouter);
_router.use('/ToDoList', ToDoRouter);

export const router = _router;