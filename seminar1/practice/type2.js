const name = "aaa";
console.log(typeof name);
console.log(`안녕하세요 제 이름은 ${name}입니다.`);

let arr = ["안녕", 1, "나는", true];
let num = [1, 2, 3, 4];
const newNumArr = num.map((x) => x * 2); //여러줄이면 중괄호 사용
console.log(newNumArr);

newNumArr.map((x) => {
  console.log(x);
});

for (const x of newNumArr) {
  console.log(x);
}

//typeof(null) => object 버그임.
