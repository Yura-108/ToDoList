import {useEffect, useState} from 'react'
import './App.scss'
import MainInput from "./Components/MainInput.jsx";
import Task from "./Components/task.jsx";
import { Reorder} from "framer-motion";

function App() {
    const [tasksArray, setTasksArray] = useState( JSON.parse(localStorage.getItem('tasks')) || [])
    const [idTask, setIdTask] = useState(JSON.parse(localStorage.getItem('ids')) || 0)


    const addTask = (text) => {
        setIdTask(idTask => idTask+1)
        setTasksArray([{text, id: idTask, completed: false}, ...tasksArray])
    }
    const deleteTask = (id) => {
        setTasksArray(tasksArray.filter(task => task.id !== id))
    }

    const changeTask = (text, id) => {
        setTasksArray(tasksArray.map(task => {
            if(task.id === id) {
                return {...task, text}
            } else {
                return {...task}
            }
        }))
    }

    useEffect(() => {
        if (tasksArray) {
            localStorage.setItem("ids", JSON.stringify(idTask))
            localStorage.setItem("tasks", JSON.stringify(tasksArray))
        }
    }, [tasksArray])

    const taskCompleted = (check, id) => {
        setTasksArray(tasksArray.map(task => {
            if(task.id === id) {
                return {...task, completed: check}
            } else {
                return {...task}
            }
        }))
    }

  return (
    <div className="App">
      <h1 className="mainTitle">ToDoList</h1>
        <MainInput addTask={addTask} />
            {!tasksArray.length && <h2>Задач нет</h2>}
            <Reorder.Group className="container d-flex align-items-center flex-column mt-lg-5" as="div" axis="y" onReorder={setTasksArray} values={tasksArray}>
            {tasksArray.map((taskObj, i) =>
                <Task
                    changeTask={changeTask}
                    deleteTask={deleteTask} num={i+1} task={taskObj}
                    key={taskObj.id} taskCompleted = {taskCompleted}
                />)}
            </Reorder.Group>
    </div>
  )
}

export default App
