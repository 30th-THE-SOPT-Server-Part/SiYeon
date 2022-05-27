import mongoose from "mongoose";
import { MovieInfo } from "../interfaces/movie/MovieInfo"

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true //null 안돼.
    },
    director: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    thumbnail:{
        type: String
    },
    story: { //서브 도큐먼트가 들어갈 수 있는 몽고디비의 특징.
        type: String
    },
    comments: [{
        writer: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User" //반드시 적어주기.
        },
        comment:{
            type: String,
            required: true
        }
    },{ timestamps:true}],
}, {
    timestamps:true //createdAt, updatedAt 자동기록
});

//export도 몽구스를 통해. 내보낼때는 Mongoose.model. 
export default mongoose.model<MovieInfo & mongoose.Document>("Movie", MovieSchema); //(이름, 뭘)
