import express, {Request, Response, NextFunction} from 'express';
import { request } from 'http';

const app = express(); //express 객체 받아옴. 앞으로 계속 app 사용.

app.use(express.json()); //request body를 express에서 json으로 받아오기. json 형식 통신이라고 알려주는거. 
app.use('/api', require('./api')); //api폴더로 분기.

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hi! My name is Siyeon!!!!!!!!!!');
}); //next는 미들웨어 사용 시. '/' = 최상단 루트 엔드포인트

app.listen('8000', ()=> {
    console.log(`
        #############################################
            🛡️ Server listening on port: 8000 🛡️
        #############################################
    `);
}); //8000으로 열고, 콘솔에 잘 열렸는지 보겠다.