import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import Movie from "../models/Movie";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";

const createMovie = async (movieCreateDto: MovieCreateDto): Promise<PostBaseResponseDto> => {
    try{
        const movie = new Movie(movieCreateDto); //안에있는 필드 검증 다 했으니 그냥 넣으면 돼.
        await movie.save();
        const data = {
            _id: movie._id
        };
        
        return data;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

const createMovieComment = async (movieId: string, movieCommentCreateDto:MovieCommentCreateDto): Promise<MovieInfo | null> => { //movie 전체 반환.
    try{
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const newComments:MovieCommentInfo[] = [...movie.comments, movieCommentCreateDto]; //[...이미있는배열, 추가할 애]
        const updatedMovie = await Movie.findOneAndUpdate({_id: movieId}, {comments:newComments}, {new:true});
        //new:true => 업데이트 된 애를 반환하고 싶다는 뜻.
        if (!updatedMovie) return null;
        return updatedMovie; //영화 통째로 넘김. 그래서 반환값 MovieInfo.
    }catch(error){
        console.log(error);
        throw error;
    }
}

const getMovie = async(movieId:string): Promise<MovieResponseDto | null> => {
    try{
        const movie = await Movie.findById(movieId).populate('comments.writer'); //레퍼라
        if (!movie) return null;

        return movie;
    }catch(error){
        console.log(error);
        throw error;
    }
}

const updateMovieComment = async(movieId: string, commentId: string, userId: string, movieCommentUpdateDto:MovieCommentUpdateDto): Promise<MovieInfo | null> => {
    try{
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const data = await Movie.findOneAndUpdate(
            {_id: movieId, comments: { $elemMatch: {_id: commentId, writer:userId} }}, //filter query filter
            {
                $set: {
                    'comments.$.writer': userId,
                    'comments.$.comment': movieCommentUpdateDto.comment
                }
            }, //update query update
            {new:true} //query options
        );

        return data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export default{
    createMovie,
    createMovieComment,
    getMovie,
    updateMovieComment
}