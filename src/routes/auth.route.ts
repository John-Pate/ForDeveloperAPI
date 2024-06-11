import { Router } from 'express';
import { authController } from '../controllers';

const _router: Router = Router({
    mergeParams: true,
});

_router.route('/Signup').post(authController().signup);
_router.route('/Signin').post(authController().signin);

export const router = _router;