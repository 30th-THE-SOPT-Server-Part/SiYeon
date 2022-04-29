

/**
 * 선택적 프로퍼티
 */

 interface Closet {
    name: string;
    shirt: number;
    pants: number;
    sunglass?: number;
    hat?: number;
}

const ohmygirl: Array<Closet> = [
    {
        name: '효정',
        shirt: 5,
        pants: 2,
    },
    {
        name: '아린',
        shirt: 2,
        pants: 8,
        hat: 2  // 선택적!
    }
];

/**
 * funciton interface
 */

const showOhmygirl = (arr: Closet[]) => {
    arr.map(e => {
        console.log(e.name);
        console.log(e.pants);
        console.log(e.shirt);
        console.log(e.hat);
        console.log(e.sunglass);
    })
};

showOhmygirl(ohmygirl);

const returnOhmygirl = (arr: Closet[]): Closet[] => {
    return arr;
};

console.log(returnOhmygirl(ohmygirl));


interface Sopt {
    season: number;
    group: string[];
    part: string[];
    president: string;
    introduce(): string[];
}

const currentSopt: Sopt = {
    season: 30,
    group: ['YB', 'OB'],
    part: ['서버', '기획', '디자인', '안드로이드', '웹', 'iOS'],
    president: '김규민',
    introduce: function () {
        return this.part.map(name => {
            // console.log(`솝트 내 파트는 ${name} 파트가 있어요!`)
            return `솝트 내 파트는 ${name} 파트가 있어요!`
        });
    }
}

console.log(currentSopt.introduce());

interface ServerPart {
    name: string;
    age: number;
    group: string;
    mbti: string[];
}

const serverPart: ServerPart = {
    name: '김소령',
    age: 5,
    group: 'YB',
    mbti: ['ENFJ', 'ANGEL']
}

const serverMembers: Array<ServerPart> = [
    {
        name: '김소령',
        age: 5,
        group: 'YB',
        mbti: ['ENFJ', 'ANGEL']
    },
    {
        name: '김소령',
        age: 5,
        group: 'YB',
        mbti: ['ENFJ', 'ANGEL']
    }

];
console.log(serverPart);

interface Closet {
    name: string;
    shirt: number;
    pants: number;
    hat?: number;
    sunglass?: number; //optional
} 

const closet: Closet[] = [
    {
        name: '김시연',
        shirt: 1,
        pants: 2,
        hat: 4,
        sunglass: 2
    }
]


//type
let isDone: boolean = true;

const str: string = 'hello';

let num: number = 2;

// const sum: number = 'sum number';

// Type 'string' is not assignable to type 'number'.


let array1: number[] = [1, 2, 3];

const strArr: Array<string> = ['hello', 'world'];

const objArr: Array<object> = [
    { item: 'value' },
    { itme: 'value2' }
];

// objArr.map(obj => {
//     console.log(`item: ${obj.item1}`)
// })
// objArr.map((obj: any) => {
//     console.log(`item: ${obj.item1}`);
// })

/**
 * object vs Object
 */

const foo1 = (obj: object): void => {
    console.log(obj);
};

const boo = (obj: Object): void => {
    console.log(obj);
}

// foo1('hi');
// Argument of type 'string' is not assignable to parameter of type 'object'.

boo('hi');


/**
 * function return type
 */

function foo2(a: number, b: number): number {
    return a + b;
}

const boo2 = (a: number, b: number): number => {
    return a + b;
}

const noReturn = (): void => {
    console.log('hihi');
}

// foo2('hello', 2); 
// Argument of type 'string' is not assignable to parameter of type 'number'

/**
 * null , undefined
 */

let aa: null = null;

// let x: null = 2; 
// Type '2' is not assignable to type 'null'

let bb: undefined = undefined;

// let y: undefined = null;
// Type 'null' is not assignable to type 'undefined'.

console.log(b);

/**
 * Type assertions
 */

// angle-bracket
let myName: any = '김시연';
let myNameLength: number = (<string>myName).length;

// as 
let yourName: any = "강민재";
let yourNameLength: number = (yourName as string).length;

/**
 * any
 */

const unknown: any = {
    name: '채정아',
    age: 18,
    organization: 'SOPT',
    completion: [28, 29]
}

console.log(unknown);


