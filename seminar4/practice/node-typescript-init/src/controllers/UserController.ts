import express, { Request, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage"
import util from "../modules/util";
import { UserService } from "../services";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import User from "../models/User";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";

//컨트롤러 작성을 해보자

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
// 이런 주석을 달아줌 보통.
const createUser = async (req: Request, res: Response) => {
    const userCreateDto: UserCreateDto = req.body; 
        // UserCreateDto 로 req.body 받아줌. 이따 서비스 레이어에 던져줄것.
    try{
        const data = await UserService.createUser(userCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)); //response에 data 끼워주고!

    }catch(err){
        console.log(err); //서버 내부에서 오류 발생.
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }
}

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
    updateUser, 
    findUserById,
    deleteUser
}