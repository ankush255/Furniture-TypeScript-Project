import express , {Request, Response, request, response} from 'express';

const app = express();
const port : Number = 1234;

app.get('/', (req: Request , res:Response)=>{
    res.send("Welcome To Express Server....");
})


app.listen(port ,()=>{
    console.log('Server Start http://localhost:1234');
})