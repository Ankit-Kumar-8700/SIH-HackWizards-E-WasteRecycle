import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";


import {connectDb} from "./db/connection.js";

import authRouter from './routes/user.js';


// Remember to remove unneeded data from response right now we are sending everything but in future remove and send onyl needed one's


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


app.get('/',(req,res) => {
    res.send('Everything working fine here !!');
})

app.use('/api/v1/user', authRouter);




const port = process.env.PORT ||  5000;

const start = async() => {
    try{
       await connectDb(process.env.MONGO_URL);
       app.listen(port,() => console.log("Server running successfull!!y"))
    }
    catch(error){
        console.log(error);
    }
}


start();

