import mongoose from "mongoose";

export interface MovieInfo {
    title: string;
    director: string;
    startDate: Date;
    thumbnail: string; //s3 주소
    story: string;
    comments: MovieCommentInfo[];
}

export interface MovieCommentInfo{
    writer: mongoose.Types.ObjectId | string;  //보통 프런트에서 넘어올때 스트링으로 넘어와서.
    comment: string;
}