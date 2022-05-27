import mongoose from "mongoose";
import config from "../config"; 
import Movie from "../models/Movie";
import Review from "../models/Review";

//몽고 디비에 몽구스로 연결하기! - connectDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI); //비동기 처리
    mongoose.set('autoCreate', true); //몽구스 옵션 변경 - 옵션은 홈페이지에서 여러개 확인하기
    console.log("Mongoose Connected ...");

    //빈 컬렉션 생기게 코드 추가!
    Movie.createCollection().then(function (collection){
      console.log("Movie colleciton is created!");
    });
    Review.createCollection().then(function (collection){
      console.log("Review colleciton is created!");
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
 