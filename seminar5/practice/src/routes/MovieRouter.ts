import { Router } from "express";
import MovieController from "../controllers/MovieController";
import { body } from "express-validator/check";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post('/', [
    body('title').notEmpty(), //validation 검사.
    body('director').notEmpty()
], MovieController.createMovie);

router.post('/:movieId/comment', [
    body('writer').notEmpty(), //validation 검사.
    body('comment').notEmpty()
], MovieController.createMovieComment)

router.get('/:movieId', MovieController.getMovie);

router.put('/:movieId/comments/:commentId', [
    body('comment').notEmpty()
], auth, MovieController.updateMovieComment);

export default router;  