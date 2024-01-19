import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { registerValidator } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import {checkMe, login, register} from "./controllers/UserController.js";

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/ToDoList')
    .then(() => {console.log('Connect to Database')})
    .catch((err) => console.log('error with Database', err))


app.use(cors());
app.use(express.json());

app.post('/auth/login', login)

app.post('/auth/register', registerValidator, register)

app.get('/auth/me', checkAuth , checkMe)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
