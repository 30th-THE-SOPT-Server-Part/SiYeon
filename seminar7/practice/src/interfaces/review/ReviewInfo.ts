import mongoose from "mongoose";

export interface ReviewInfo {
    writer: mongoose.Types.ObjectId;
    movie: mongoose.Types.ObjectId; //참조!!
    title: string;
    content: string; 
}
