import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {registerValidator, taskValidator} from "./Validations.js";
import checkAuth from "./utils/checkAuth.js";
import {checkMe, login, register} from "./controllers/UserController.js";
import {addingTask, deleteTask, getAllTask, updateTask} from "./controllers/TaskController.js";

const app = express();
const PORT = 3000;
const URL = 'mongodb://localhost:27017/ToDoList'

mongoose.connect(URL)
    .then(() => {console.log('Connect to Database')})
    .catch((err) => console.log('error with Database', err))


app.use(cors());
app.use(express.json());
// User
app.post('/auth/login', login)
app.post('/auth/register', registerValidator, register)
app.get('/auth/me', checkAuth , checkMe)

// Tasks
app.post('/tasks', checkAuth, taskValidator, addingTask)
app.get('/tasks', getAllTask)
app.delete('/tasks/:id', checkAuth, deleteTask)
app.patch('/tasks/:id', checkAuth, updateTask)


app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
