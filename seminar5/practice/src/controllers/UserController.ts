import express, { Request, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage"
import util from "../modules/util";
import { UserService } from "../services";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import User from "../models/User";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { validationResult } from "express-validator";
import getToken from "../modules/jwtHandler";
import { UserSignInDto } from "../interfaces/user/UserSigninDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";

//컨트롤러 작성을 해보자

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
// 이런 주석을 달아줌 보통.
const createUser = async (req: Request, res: Response) => {
    //validator 넣었으니 에러 잡아보자
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    const userCreateDto: UserCreateDto = req.body; 
        // UserCreateDto 로 req.body 받아줌. 이따 서비스 레이어에 던져줄것.
    try{
        const result = await UserService.createUser(userCreateDto);
        if (!result) return res.status(statusCode.CONFLICT).send(util.fail(statusCode.CONFLICT, message.EMAIL_DUPLICATED));
        
        //이제 회원가입 됐으니까 토큰을 줄거야
        const accessToken:string = getToken(result._id);
        const data = {
            _id: result._id,
            accessToken
        }

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)); //response에 data 끼워주고!

    }catch(err){
        console.log(err); //서버 내부에서 오류 발생.
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }
}
/**
 *  @route POST /user/signin 
 *  @desc Signin User
 *  @access Public
 */
const signinUser = async(req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const userSigninDto: UserSignInDto = req.body;
    try{
        const result = await UserService.signInUser(userSigninDto);
        if (!result) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        } if (result === 401) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_PASSWORD));
        }

        const accessToken = getToken((result as PostBaseResponseDto)._id); //null, number 타입은 앞에서 처리했으므로 타입 단언 가능.
        const data = {
            _id: (result as PostBaseResponseDto)._id,
            accessToken
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNIN_USER_SUCCESS, data));

    }catch(err){
        console.log(err); //서버 내부에서 오류 발생.
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}
//바디 받아올 거라서 post로.



/**
 *  @route PUT /user/:userId
 *  @desc Update User
 *  @access Public
 */
const updateUser = async (req: Request, res: Response) => {
    const userUpdateDto: UserUpdateDto = req.body; //dto 에 바디 넣어 받아오기.
    const {userId} = req.params;
    try{
        await UserService.updateUser(userId, userUpdateDto);
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.UPDATE_USER_SUCCESS));

    }catch(error){
        console.log(error); //서버 내부에서 오류 발생.
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }
}

/**
 *  @route GET /user/:userId
 *  @desc READ User
 *  @access Public
 */
const findUserById = async (req:Request, res:Response)=>{
    const {userId} = req.params;
    try{
        const data = await UserService.findUserById(userId);
        if (!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));

    }catch(err){
        console.log(err); //서버 내부에서 오류 발생.
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route DELETE /user/:userId
 *  @desc DELETE User
 *  @access Public
 */
 const deleteUser = async (req:Request, res:Response)=>{
    const {userId} = req.params;
    try{
        await UserService.deleteUser(userId);
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.UPDATE_USER_SUCCESS));
    }catch(err){
        console.log(err); //서버 내부에서 오류 발생.
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


export default{
    createUser,
    signinUser,
    updateUser, 
    findUserById,
    deleteUser
}