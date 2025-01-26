import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";
import cors from "cors";
import { triggerRouter } from "./router/trigger";
import { actionRouter } from "./router/action";
import cookieParser from 'cookie-parser';
const CORS_URL=process.env.CORS_URL;
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: CORS_URL||'http://localhost:3000', // Frontend origin
    credentials: true,              // Allow cookies to be sent
  }))

app.use("/api/v1/user", userRouter);
app.get('/healthy',(req,res)=>{
    res.send("healthy")
}
)

app.use("/api/v1/flow", zapRouter);

app.use("/api/v1/trigger", triggerRouter);

app.use("/api/v1/action", actionRouter);

app.listen(4000);
