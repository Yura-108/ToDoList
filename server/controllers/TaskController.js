import {validationResult} from "express-validator";
import TaskSchema from "../models/Task.js";

export const addingTask = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const document = new TaskSchema({
            title: req.body.title,
            description: req.body.description,
            time: req.body.time,
            date: req.body.date,
            completed: req.body.completed,
            deadline: req.body.deadline,
            importance: req.body.importance,
            user: req.userId,
        })

        const task = await document.save()
        res.json(task)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось добавить новую задачу'
        })
    }
}
export const getAllTask = async (req, res) => {
    try {
        const tasks = await TaskSchema.find({ user: req.userId }).populate('user').exec();
        //const tasks = await TaskSchema.find().populate('user').exec()

        res.json(tasks)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить все задачи'
        })
    }
}
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        TaskSchema.deleteOne({_id: taskId})
            .then(result => {
                console.log('Запись успешно удалена');
            })
            .catch(err => {
                console.error('Ошибка при удалении записи:', err);
            })
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось удалить задачу'
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id

        await TaskSchema.updateOne({_id: taskId}, {
            title: req.body.title,
            description: req.body.description,
            time: req.body.time,
            date: req.body.date,
            completed: req.body.completed,
            deadline: req.body.deadline,
            importance: req.body.importance,
            user: req.userId,
        });

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить задачу'
        })
    }
}