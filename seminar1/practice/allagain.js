//array
let arr = [1, "item", true];
let arr2 = Array(4, null, { item: "item" });

arr.map((item) => console.log(item));
arr2.map((item) => console.log(item));

// 함수 선언식
function sum(a, b) {
  return a + b;
}

// 함수 표현식
let sum2 = (a, b) => {
  return a + b;
};

console.log(typeof arr);

console.log(typeof "hi");

let numArr = [1, 2, 3];
const newArr = numArr.map((x) => x * 2);

console.log(newArr);
// 2 4 6

//block
if (true) {
  var x = "var";
}
console.log(`var: ${x}`);

if (true) {
  let y = "let";
}
console.log(`let: ${y}`);

function foo() {
  if (true) {
    var variable = "hello";
    console.log("if block - ", variable);
  }
  console.log("function block - ", variable);
}

console.log("global - ", variable);

//event

function greet() {
  return "hello";
}

function timer() {
  return setTimeout(() => {
    return "End";
  }, 3000);
}

greet();
timer();
//interface

const sopt = {
  season: 30,
  group: ["YB", "OB"],
  part: ["서버", "기획", "디자인", "안드로이드", "웹", "iOS"],
  president: "김규민",
  introduce: function () {
    this.part.map((name) => {
      console.log(`솝트 내 파트는 ${name} 파트가 있어요!`);
    });
  },
};

console.log(sopt.group);
sopt.introduce();

console.log(sopt.season);

let array = [1, true, "string"];
console.log(array);

let array2 = [
  {
    name: "김소령",
    age: 5,
  },
  {
    name: "박정무",
    age: 15,
  },
];

console.log(array2);
console.log(typeof array2);

/**
 * function 파라미터 전달
 */

// const func = (x) => {
//     return x * x;
// }

// const mul = (func, num) => {
//     return func(num);
// }

// console.log(mul(func, 3));

//함수 선언식
// function menu(dinner) {
//     return `오늘 메뉴는 ${dinner} 입니다.`;
// }

// const str2 = menu('삼겹살');
// console.log(str2);

// 함수 표현식
const menu = (dinner) => {
  return `오늘 메뉴는 ${dinner} 입니다.`;
};

const str2 = menu("떡볶이");
console.log(str2);

const func = (num) => {
  return num * num;
};

const multiple = (func, num) => {
  console.log(func(num));
};

multiple(func, 3);

// let a = 2;
// let b = a++;
// // let b = a++; -> b = a+1
// let b = ++a; // -> b = a+1

// console.log(b); /

let a = 2 + 3;
let x = 5;
let b = 2 * 3;
let c = 3 - 2;
let d = 4 / 2;

console.log(a, b, c, d);

if (a != c) {
  console.log("a != c");
}

let y = "5";

if (a !== y) {
  console.log("a !== y");
}
// 6 / 2 나머지
if (b % d == 0) {
  console.log(b % d);
  console.log("나머지 0");
}
// and or
if (a === 5 && d === 2) {
  console.log("hi");
}

if (a === 4 || d === 2) {
  console.log("or");
}

console.log(typeof a); //number
const n = null;

console.log(typeof typeof a);

if (typeof a == "number") {
  console.log(a);
}
// 과제 조건
// 1. Member, Dinner interface 만들고 타입 지정하기
// 2. organize 내부 로직 채우기

const dinner = {
  member: [
    {
      name: "김시연",
      group: "yb",
    },
    {
      name: "김루희",
      group: "ob",
    },
    {
      name: "박진수",
      group: "ob",
    },
  ],
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  },
  organize(array) {
    this.shuffle(array);

    console.log(
      `오늘의 저녁 식사 멤버는 ${dinnerMember[0]}, ${dinnerMember[1]}`
    );
  },
};

dinner.organize(dinner.member);
