// GET 에서 사용
import mongoose from "mongoose";
import { UserCreateDto } from "./UserCreateDto";


export interface UserResponseDto extends UserCreateDto{
    _id: mongoose.Schema.Types.ObjectId
    //gender:string; //이런식으로 확장해서 쓸 수 있다! 
}

