import express , {Request, Response} from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
dotenv.config();
const app = express();
const port: Number = Number(process.env.PORT);
const mongoURL : string = process.env.MONGO_URL as string ;
const filePath = path.join(__dirname,"/image");

app.use(express.json());
app.use("/src/image", express.static(filePath));

// App Routes

import appRoutes from './routes/User/index.routes';
app.use("/api/app", appRoutes);


// Database Connection ( DB )
mongoose
    .connect(mongoURL)
    .then(() => console.log("DB is Connected..."))
    .catch((error) => console.log(error));

app.get('/', (req: Request , res:Response)=>{
    res.send("Welcome To Express Server....");
})


app.listen(port ,()=>{
    console.log(`Server Start http://localhost:${port}`);
})


//  Normal File Install => npi i dotenv

// TypeScript File Install => npm i -D @types/dotenv