//router index file
import { Router } from 'express';
import ReviewRouter from './ReviewRouter';
import MovieRouter from './MovieRouter';
import UserRouter from "./UserRouter";
import FileRouter from "./FileRouter";

const router: Router = Router();

router.use('/user', UserRouter);
router.use('/review', ReviewRouter);
router.use('/movie', MovieRouter);
router.use('/file', FileRouter);

export default router;
