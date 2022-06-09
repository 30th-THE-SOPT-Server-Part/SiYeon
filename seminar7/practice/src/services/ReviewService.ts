import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import Review from "../models/Review";
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType";
import { ReviewsResponseDto } from "../interfaces/review/ReviewsResponseDto";
import { ReviewInfo } from "../interfaces/review/ReviewInfo";

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

// const getReviews = async (movieId: string): Promise<ReviewResponseDto[]> => {
//     try {
//         const reviews = await Review.find({ //가공해서 내용만 뜨게 해보자!
//             movie: movieId
//         }).populate('writer', 'name').populate('movie');

//         const data = await Promise.all(reviews.map(async (review: any) => { 
//             const result = {
//                 writer: review.writer.name, //이름만 주는 것
//                 movie: review.movie,
//                 title: review.title,
//                 content: review.content
//             };
            
//             return result;
//         }));

//         return data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

//검색+pagination 버전
const getReviews = async (movieId: string, search: string, option: ReviewOptionType, page: number): Promise<ReviewsResponseDto> => {
    const regex = (search:string) => new RegExp(`.*${search}.*`);

    let reviews : ReviewInfo[] = [];
    const perPage: number = 2;

    try{
        const pattern: RegExp = regex(search);

                
        if (option === 'title'){
            reviews = await Review.find({ title: { $regex: pattern }})
                            .where('movie').equals(movieId) //filter로 해도 되구, where도 쓸 수 있다는거!
                            .sort({createdAt: -1}) //최신순 정렬
                            .skip(perPage*(page-1))
                            .limit(perPage);
        } else if(option === 'content'){
            reviews = await Review.find({ director: { $regex: pattern }})
                            .where('movie').equals(movieId) 
                            .sort({createdAt: -1}) //최신순 정렬
                            .skip(perPage*(page-1))
                            .limit(perPage);;
        } else {
            reviews = await Review.find({
                $or: [
                    { content: { $regex: pattern } },
                    { title: { $regex: pattern } }
                ] //$or 연산자 사용!!
            }).where('movie').equals(movieId) 
            .sort({createdAt: -1}) //최신순 정렬
            .skip(perPage*(page-1))
            .limit(perPage);;
        }

        const total: number = await Review.countDocuments({movie: movieId});
        const lastPage: number = Math.ceil(total/perPage);

        const data = {
            reviews,
            lastPage
        }

        return data;
    }catch(error){
        console.log(error);
        throw error;
    }


}

export default {
    createReview, getReviews
}