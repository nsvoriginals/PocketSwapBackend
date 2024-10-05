import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoute.js'
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);
app.use("/users",userRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
