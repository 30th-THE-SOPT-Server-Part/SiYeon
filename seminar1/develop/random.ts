interface Member{
    name: string,
    group: string,
}

interface Dinner{
    member: Member[],
    shuffle(array:Member[]): Member[],
    organize(array:Member[]): void //메서드의 파라미터도 타입 지정.
}

const dinner: Dinner = { //Dinner 인터페이스 
    member: [
        {
            name: '채정아',
            group: 'ob'
        },
        {
            name: '김동재',
            group: 'yb'
        },
        {
            name: '강민재',
            group: 'yb'
        },
        {
            name: '김루희',
            group: 'ob'
        },
        {
            name: '박진수',
            group: 'ob'
        }
    ],
    shuffle(array) {
        array.sort(() => Math.random() - 0.5); //무작위로 '+ or -' 반환하는 compare function.
        // array.map((member)=>{
        //     console.log(`서버 ${member.name} 은 ${member.group} 이다.`);
        // }) //확인용
        return array;
    },
    organize(array) {
        this.shuffle(array);
        let dinnerMember:string[] = [];
        let lastGroup:string = array[array.length-1].group;
        let lastName:string = array[array.length-1].name;
        for (const mem of array){  //for in은 인덱스 얻는 것. 
            if(mem.group !== lastGroup){
                dinnerMember.push(mem.name);
                dinnerMember.push(lastName);
                break;
            }
        }

        console.log(`오늘의 저녁 식사 멤버는 ${dinnerMember[0]}, ${dinnerMember[1]}`);
    }
};
​
dinner.organize(dinner.member);