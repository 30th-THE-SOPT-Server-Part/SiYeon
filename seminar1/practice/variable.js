// var name = "김시연";
// var name = "kkk";

// console.log(name);

let name2 = "aaa";
name2 = "vbb";

console.log(name2);

const name3 = "bbb";
//name3 = "aaa";

console.log(name3);

// var 은 function scope - block과 관계x
// let, const 은 block scope - block 내부 선언하면 밖에서 사용 불가.

if (true) {
  var x = "var variable";
}
console.log(x);

if (true) {
  const y = "const variable";
}

//console.log(y); // const가 block scope 라서.

function foo() {
  if (true) {
    var name = "ksy";
    console.log("if-block-", name);
  }
  console.log("func-block-", name);
}
console.log("global-", name); //func 안에서 정의한 var은 func 밖x
