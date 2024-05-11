import {config} from "dotenv";
import express from 'express'
import methods from "./routes/api.js";
import mongoose from "mongoose";

config()
const app = express()

await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
mongoose.set('bufferCommands', false);

app.use(express.json());
app.use('/api', methods)

app.listen(3000)

