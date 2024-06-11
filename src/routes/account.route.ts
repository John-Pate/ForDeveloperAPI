import { Router } from 'express';
import { accountController } from '../controllers';

//ROLE ROUTES//
const _router: Router = Router({
    mergeParams: true,
});

//ROLE LIST
_router.route('/List').get(accountController().getAllAccount);

export const router = _router;