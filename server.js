import {config} from "dotenv";
import express from 'express'
import methods from "./routes/api.js";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors'

config()
const app = express()

await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
mongoose.set('bufferCommands', false);

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Activity Finder API",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger"
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                }
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
app.use(cors());
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(options)))
app.use(express.json());
app.use(methods)

app.listen(3000)

