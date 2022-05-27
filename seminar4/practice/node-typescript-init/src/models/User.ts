import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true //null 안돼.
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, //고유한 이메일.
    },
    age:{
        type: Number
    },
    school: { //서브 도큐먼트가 들어갈 수 있는 몽고디비의 특징.
        name: {type: String},
        major: {type: String}
    }
});

//export도 몽구스를 통해. 내보낼때는 Mongoose.model. 
export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema); //(이름, 뭘)
