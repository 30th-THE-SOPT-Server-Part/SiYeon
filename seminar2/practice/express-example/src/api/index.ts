import express, {Router} from 'express';

const router: Router = express.Router(); //express 라우팅 시스템을 받아오기!
router.use('/user', require('./user')); //user라는 엔드포인트로 들어온 요청은 user 모듈에 줄거다 라고 라우팅 해주는거.

module.exports = router; //라우터를 모듈로 반환.