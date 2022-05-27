import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { body } from "express-validator/check";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post('/movies/:movieId', [
    body('title').notEmpty(), //express-validator 써보자. 리퀘스티 바디 검사하기!
    body('writer').notEmpty(),
    body('content').notEmpty()
], ReviewController.createReview);

router.get('/movies/:movieId', auth, ReviewController.getReviews); //여기 직관적으로 컨트롤러 가기 전에 auth 미들웨어 넣기!!
//토큰 잘 확인되면 아까 쓴 next로 인해 컨트롤러로 이동할 수 있게 되는 것.

export default router;  