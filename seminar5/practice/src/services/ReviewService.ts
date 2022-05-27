import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import Review from "../models/Review";

const createReview = async (movieId: string, reviewCreateDto: ReviewCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const review = new Review({
            title: reviewCreateDto.title, //이렇게 해야 에러가 안뜨더라. 그냥 createdto 하면 안되네.
            content: reviewCreateDto.content,
            writer: reviewCreateDto.writer,
            movie: movieId
        });

        await review.save();

        const data = {
            _id: review._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getReviews = async (movieId: string): Promise<ReviewResponseDto[]> => {
    try {
        const reviews = await Review.find({ //가공해서 내용만 뜨게 해보자!
            movie: movieId
        }).populate('writer', 'name').populate('movie');

        const data = await Promise.all(reviews.map(async (review: any) => { 
            const result = {
                writer: review.writer.name, //이름만 주는 것
                movie: review.movie,
                title: review.title,
                content: review.content
            };
            
            return result;
        }));

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createReview, getReviews
}