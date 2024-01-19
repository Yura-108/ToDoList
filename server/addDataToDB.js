import mongoose from "mongoose";

const URL = 'mongodb://localhost:27017/ToDoList'

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Подключение к базе данных успешно установлено');
    } catch (error) {
        console.error('Ошибка подключения к базе данных:', error.message);
        process.exit(1)
    }
}

const addDataToDB = async () => {
    try {
        const Task = mongoose.model('Task');
        await Task.insertMany()
        console.log('Записи успешно добавлены в базу данных');
    } catch (error) {
        console.error('Ошибка при добавлении данных в базу данных:', error.message);
    } finally {
        mongoose.disconnect()
    }
}

connectToDatabase()
addDataToDB()