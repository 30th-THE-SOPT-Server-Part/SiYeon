import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { UserSignInDto } from "../interfaces/user/UserSigninDto";

//디비에 접근할 거니까 async, await 필수.
//async 니까 반환값 프로미스 잊지마~~
const createUser = async (UserCreateDto: UserCreateDto): Promise<PostBaseResponseDto | null> => {
    try{
        const existUser = await User.findOne({
            email: UserCreateDto.email
        }); //없어야겠지
        if (existUser) return null;

        const user = new User({
            name: UserCreateDto.name,
            phone: UserCreateDto.phone,
            email: UserCreateDto.email,
            password: UserCreateDto.password,
            age: UserCreateDto.age,
            school: {
                name: UserCreateDto.school?.name,
                major: UserCreateDto.school?.major
            }
        });
        //const user = new User(userCreateDto)로 한번에 넣기도 가능.

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(UserCreateDto.password, salt);
        
        await user.save();

        //몽고 디비는 id 앞에 언더바.
        const data = {
            _id: user.id
        };
        return data;

    } catch(error){
        console.log(error);
        throw error; //던지기만. 레스폰스 서비스에서는 안 보내.
    }
}

const signInUser = async(userSignInDto: UserSignInDto): Promise<PostBaseResponseDto | null | number> => {
    try{
        const user = await User.findOne({
            email: userSignInDto.email
        })
        if (!user) return null;

        const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
        if (!isMatch) return 401;
        
        const data = {
            _id: user._id
        };
        return data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

const updateUser = async (userId:string, userUpdateDto: UserUpdateDto) => {
    try{
        // findByIdAndUpdate 라는 몽구스 함수 이용! 개꿀이넹~
        await User.findByIdAndUpdate(userId, userUpdateDto);
        //or, const updateUser = {} 해서 위처럼 만들어도 됨다~
    } catch (err){
        console.log(err);
        throw err;
    }
}

const findUserById = async (userId:string):Promise<UserResponseDto|null> =>{
        const user = await User.findById(userId);
        if (!user) {return null;}
        return user;
}

const deleteUser = async(userId:string):Promise<void> => {
    try{
        await User.findByIdAndDelete(userId);
    }catch(err){
        console.log(err);
        throw err;
    }
}

export default{
    createUser,
    signInUser,
    updateUser,
    findUserById,
    deleteUser
}
