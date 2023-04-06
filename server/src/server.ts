import express, {Express, Request, Response} from 'express';

const app: Express = express();
const port = 8080;

app.get('/', (req: Request, res: Response)=>{
    console.log(`this is typescript123`)
    res.send('Hello, this is Express + TypeScript');
});

app.listen(port, ()=> {
console.log(`[Server]: I am running at http://localhost:${port}`);
});