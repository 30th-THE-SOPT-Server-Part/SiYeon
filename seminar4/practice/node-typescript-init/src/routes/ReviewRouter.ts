import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { body } from "express-validator/check";

const router: Router = Router();

router.post('/movies/:movieId', [
    body('title').notEmpty(), //express-validator 써보자. 리퀘스티 바디 검사하기!
    body('writer').notEmpty(),
    body('content').notEmpty()
], ReviewController.createReview);

router.get('/movies/:movieId', ReviewController.getReviews);

export default router; 