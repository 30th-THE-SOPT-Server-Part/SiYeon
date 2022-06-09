import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage"
import util from "../modules/util";
import e from "express";
import { FileService } from "../services";

const uploadFileToS3 = async(req: Request, res: Response) => {
    if (!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

    const image: Express.MulterS3.File = req.file as Express.MulterS3.File; //req.file은 기본 Express.Multer.File 타입으로 추론되어서 s3버전으로 타입 단언 필요.
    const { originalname, location } = image;

    try{
        const data = await FileService.createFile(location, originalname);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const uploadFilesToS3 = async(req: Request, res: Response) => {
    if (!req.files) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

    const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[]; //타입도 배열로!

    try{
        const imageList: {
            location: string;
            originalname: string;
        }[] = await Promise.all(images.map((image: Express.MulterS3.File) => { //Promise.all -> 연관성 없는 작업들 동시 실행
            return {
                location: image.location,
                originalname: image.originalname
            }
        }));

        const data = await FileService.createFiles(imageList);
        
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
    } catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    uploadFileToS3,
    uploadFilesToS3
}