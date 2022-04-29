//#call back function
// console.log('안녕하세요');
// setTimeout(()=>{
//     console.log('set time out');
// }, 2000); //1000ms = 1s

// console.log('끝'); //끝부터 출력 & 2초 뒤에 sto.


//#promise
// const condition: boolean = false;
// const promise = new Promise((resolve, reject)=>{
//     if (condition) {
//         resolve('성공'); //resolve 에 '성공'이라는 값. 
//     } else{
//         reject(new Error('reject !! error'));
//     }
// });

// promise.then((resolveData):void => {
//             console.log(resolveData); 
//         })//이름은 안중요. promise 반환값을 받아온다고 생각?
//         .catch(error => console.log(error)); //체이닝되는 코드 - 깔끔.

// #promise - 레스토랑 예제
// const restaurant = (callback: () => void, time: number) => {
//     setTimeout(callback, time);
// }

// const order = (): Promise<string> => {  //반환값 타입 주목 - 프로미스 안 스트링.
//     return new Promise((resolve, reject) => {
//         restaurant(()=>{
//             console.log('[레스토랑 진행 상황 - 음식 주문]');
//             resolve('음식 주문 시작');
//         }, 1000);
//     })
// }

// const cook = (progress:string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(()=> {
//             console.log('[레스토랑 진행 상황 - 음식 조리 중]');
//             resolve(`${progress} -> 음식 조리 중`);
//         }, 2000);
//     })
// }

// const serving = (progress:string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(() => {
//             console.log('[레스토랑 진행 상황 - 음식 서빙 중]');
//             resolve(`${progress} -> 음식 서빙 중`);
//         }, 2500);
//     })
// }

// const eat = (progress:string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(() => {
//             console.log('[레스토랑 진행 상황 - 음식 먹는 중]');
//             resolve(`${progress} -> 음식 먹는 중`);
//         }, 3000);
//     })
// }

// order()
//     .then(progress => cook(progress)) //progress 받아다 cook에 넣어~ 이런 느낌.
//     .then(progress => serving(progress))
//     .then(progress => eat(progress))
//     .then(progress => console.log(progress)); //마지막 출력 줄.


//# 프로미스 캐치 Promise.resolve -> 바로 리졸브.
// Promise.resolve(123)
//     .then(res=>{
//         throw new Error('에러 발생');
//         return 456; //실행될 수 없는 코드
//     })
//     .then(res => {
//         console.log(res); //456 찍고 싶지만 못 찍는다~ 여기 안거치고 바로 catch로 감.
//     })
//     .catch(error => {
//         console.log(error.message);
//     })

// #프로미스 vs 어웨잇 비교
// #1. 프로미스
let asyncFunc1 = (msg:string) : Promise<string> => {
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve(`asyncFunc1 - ${msg}` );
        }, 1000);
    });
}

let asyncFunc2 = (msg:string) : Promise<string> => {
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve(`asyncFunc2 - ${msg}` );
        }, 1500);
    });
}

// let promiseMain1 = ():void => {
//     asyncFunc1('server part').then((result: string)=> {
//         console.log(result);
//         return asyncFunc2("김시연");
//     }).then((result: string) => {
//         console.log(result);
//     });
// }

// promiseMain1();


//#2. 어싱크어웨잇
// const asyncMain = async ():Promise<void> => {
//     let result = asyncFunc1('server part');
//     console.log(result);
//     result = await asyncFunc2('김시연'); //왜 타입 에러?
//     console.log(result);
// }
// asyncMain();