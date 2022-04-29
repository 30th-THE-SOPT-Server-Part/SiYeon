import express, {Request, Response, Router} from 'express';

const router: Router = express.Router();
router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        status:200,
        message:'유저 조회 성공'
    });
});

module.exports = router; //생성한 router 객체 모듈로 반환
