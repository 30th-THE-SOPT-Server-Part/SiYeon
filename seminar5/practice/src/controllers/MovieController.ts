import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage"
import util from "../modules/util";
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import MovieService from "../services/MovieService";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";


/**
 *  @route POST /movie
 *  @desc Create Movie
 *  @access Public
 */
const createMovie = async(req:Request, res:Response) => {
    const error = validationResult(req); //미들웨어에서 검사한 결과값을 받아오기. 
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const movieCreateDto: MovieCreateDto = req.body;
    try{
        const data = await MovieService.createMovie(movieCreateDto); //data안에 id 올 것
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data));

    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route POST /movie/:movieId/comment
 *  @desc Create Movie Comment 
 *  @access Public
 */
const createMovieComment = async(req:Request, res:Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params; //params 있으니까 받아와야함!!
    
    try{
        const data = await MovieService.createMovieComment(movieId, movieCommentCreateDto);
        if (!data) {
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_COMMENT_SUCCESS, data));
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route GET /movie/:movieId
 *  @desc Get Movie
 *  @access Public
 */
const getMovie = async(req:Request, res:Response) => {
    const { movieId } = req.params;
    try{
        const data = await MovieService.getMovie(movieId);
        if(!data){
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data));
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route PUT /movie/:movieId/comments/:commentId
 *  @desc update movie comment 
 *  @access private
 */
const updateMovieComment = async(req: Request, res: Response) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const movieCommentUpdateDto: MovieCommentUpdateDto = req.body;
    const {movieId, commentId} = req.params; //여러개도 이렇게 받아와.
    const userId = req.body.user.id;

    try{
        const data = await MovieService.updateMovieComment(movieId, commentId, userId, movieCommentUpdateDto);
        if (!data){
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_MOVIE_COMMENT_SUCCESS, data));
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }

}


export default {
    createMovie,
    createMovieComment,
    getMovie,
    updateMovieComment
}