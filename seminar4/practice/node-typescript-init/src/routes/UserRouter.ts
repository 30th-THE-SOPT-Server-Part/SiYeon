import { Router } from "express";
import { UserController } from "../controllers"
const router: Router = Router();

//routes => use(/user 분기) => post
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser); //params로 아이디 받는거 이렇게!
router.get('/:userId',UserController.findUserById);
router.get('/:userId', UserController.deleteUser);

export default router;