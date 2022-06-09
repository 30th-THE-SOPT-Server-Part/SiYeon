import mongoose from "mongoose";

export interface PostBaseResponseDto{
    _id: mongoose.Schema.Types.ObjectId //몽고디비는 id가 숫자가 아니래..
}