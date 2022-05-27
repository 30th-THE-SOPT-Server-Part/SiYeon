import { Router } from "express";
import { body } from "express-validator/check"; //check 안에서 바디 불러야 잘 인식이 되어서 express-validator 가 잘된대유
import { UserController } from "../controllers"
import User from "../models/User";
const router: Router = Router();

//routes => use(/user 분기) => post
router.post('/', [ //express-validator 달아보기
    body('email').isEmail(),
    body('email').notEmpty(),
    body('password').isLength({min: 8}),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('phone').notEmpty()
], UserController.createUser);

router.post('/signin', [
    body('email').isEmail(),
    body('email').notEmpty(),
    body('password').isLength({min: 8}),
    body('password').notEmpty()
], UserController.signinUser)
router.put('/:userId', UserController.updateUser); //params로 아이디 받는거 이렇게!
router.get('/:userId',UserController.findUserById);
router.get('/:userId', UserController.deleteUser);

export default router;