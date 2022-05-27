//인터페이스 여기 정의할 것. 유저라는 콜렉션에 맞게 폴더 구분도 함.

import { SchoolInfo } from "../school/SchoolInfo";

export interface UserInfo{
    name: string;
    phone: string;
    email: string;
    password: string; 
    age: number;
    school: SchoolInfo;
}
