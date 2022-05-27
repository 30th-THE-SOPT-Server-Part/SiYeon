import express, {Request, Response, NextFunction} from "express"; //nextfunction 새롭게 받아올것!
import jwt from "jsonwebtoken";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import message from "../modules/responseMessage";
import config from "../config";

export default (req: Request, res:Response, next:NextFunction) => {
    const token = req.headers["authorization"]?.split(' ').reverse()[0]; //?는 있/없 수도 있다는 뜻.

    //토큰 유무 검증
    if(!token){ //토큰 없을 경우 - null_value_token
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
    }

    //토큰 있을 때
    try{
        const decoded = jwt.verify(token, config.jwtSecret) //jwt token 해독을 verify(토큰, 시크릿키)로.
        req.body.user = (decoded as any).user; //as any로 타입 단언. decoded 그냥 하면 에러날 수도?
        next(); //다음으로 넘어가라는 뜻 넥스트 펑션~~~ => 미들웨어 실행 끝나면 다음으로 넘어갈 수 있음.
    } catch(error:any){ //catch(error:any) 하니까 error.name 오류 안나!
        console.log(error);

        if(error.name === 'TokenExpiredError'){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
        }

        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }
}