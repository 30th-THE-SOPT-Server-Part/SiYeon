export{};

let name: string = '채정아';
console.log(name);

let grade: number = 4;
let isDeleted: boolean = false;

const sum = (x: number, y:number): number => {
    return x*y;
}
const ages: number[] = [1,2,3,4,5];
const ages2: Array<number> = [1,2,3,4];

const strArray: string[] = ["hi", "hello"]; //Array<string> 가능.


//함수에는 파라미터 타입/ 반환 타입 써야됨. 아래는 반환값 없어서 void 타입.
const f1 = (obj: object):void => { //소문자 - 원시타입 제외한 나머지 모두 가능
    console.log(obj);
}
const f2 = (obj: Object):void => { //대문자 - 모든 타입 가능
    console.log(obj);
}

f1([1,2,3]);
//f1('hihi'); //불가~

f2([1,2,3]);
f2('hi');

const div = (x:number,y:number):number => { //반환타입 Number. 여기 string 쓰면 오류남.
    return x/y;
}

let p: null = null;
let q: undefined = undefined;

//angle-bracket 타입 단언 - 형변환이랑 비슷
let name3: any = "채정아"; //any = 마법(아무타입이나 가능)
let name3Length: number = (<string>name3).length;  

//as
let name4:any = '서버';
let name4Length: number = (name4 as string).length;

// interface Name{
//    property: Type;
//    propertyoptional?: Type;
// }
