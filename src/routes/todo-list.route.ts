import { Router } from 'express';
import { todoListController } from '../controllers';

//ROLE ROUTES//
const _router: Router = Router({
    mergeParams: true,
});

//ROLE LIST
_router.route('/GetAllLists').get(todoListController().getToDoLists);
_router.route('/SaveList').post(todoListController().saveToDoList);

export const router = _router;