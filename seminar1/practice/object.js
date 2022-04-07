const sopt = {
  season: 30,
  group: ["YB", "OB"],
  part: ["서버", "기획"],
  president: "김규민",
  introduce: function () {
    this.part.map((name) => {
      console.log(`솝트 내파트는 ${name}`);
    });
  },
};

console.log(sopt.group);
sopt.introduce();
console.log(sopt.season);

//객체 배열
let array2 = [
  {
    name: "김소령",
    age: 5,
  },
  {
    name: "류주현",
    age: 22,
  },
];

console.log(array2);
console.log(typeof array2); //어레이도 객체 타입

function menu(dinner) {
  return `오늘 메뉴는 ${dinner} 입니다.`;
}
const str2 = menu("삼겹살");
console.log(str2);
const mmenu = (dinner) => {
  return `오늘 메뉴는 ${dinner} 입니다.`;
};
const str3 = mmenu("곱창");
console.log(str3);

const multiple = (func, num) => {
  console.log(func(num));
};

multiple(menu, 3);
let a = 2;
let b = a++;
console.log(b);

let c = 5;
let d = "5";
console.log(c == d); //타입 달라도 이건 true !=
console.log(c === d); //false !==
