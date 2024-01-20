import {useEffect, useRef, useState} from 'react'
import './App.scss'
import MainInput from "./Components/MainInput.jsx";
import Task from "./Components/task.jsx";
import { Reorder} from "framer-motion";


function App() {
    const [tasksArray, setTasksArray] = useState( [])

    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(data => setTasksArray(data))
            .catch(error => console.error('Ошибка при получении задач:', error));
    }, []);

    const [idTask, setIdTask] = useState(JSON.parse(localStorage.getItem('ids')) || 0)

    const taskTitle = useRef(null)
    const taskDescription = useRef(null)
    const [importance, setImportance] = useState('success')
    const [changeMode, setChangeMode] = useState(false)
    const [idEditElement, setIdEditElement] = useState(0)

    const addTask = (title, description, importance ,nowTime) => {
        setIdTask(idTask => idTask+1)
        setTasksArray([{title, description, importance, completed: false, date: nowTime}, ...tasksArray])
    }
    const deleteTask = id => {
        setTasksArray(tasksArray.filter(task => task._id !== id))
    }

    const changeTask = (id, title, description, importance) => {
        console.log(taskTitle, 'h')
        taskTitle.current.focus()
        setIdEditElement(id)
        taskTitle.current.value = title
        taskDescription.current.value = description
        setImportance(importance)
    }
    const editTask = (title, description, importance) => {
        setTasksArray(tasksArray.map(task => {
            if (task._id === idEditElement) {
                return {...task, title, description, importance}
            } else {
                return {...task}
            }
        }))
        setChangeMode(false)
    }

    useEffect(() => {
        if (tasksArray) {
            localStorage.setItem("ids", JSON.stringify(idTask))
            localStorage.setItem("tasks", JSON.stringify(tasksArray))
        }
    }, [tasksArray])

    const taskCompleted = (check, id) => {
        setTasksArray(tasksArray.map(task => {
            if(task._id === id) {
                return {...task, completed: check}
            } else {
                return {...task}
            }
        }))
    }

  return (
    <div className="App">
        <header>
            <h1 className="mainTitle">ToDoList</h1>
        </header>
        <MainInput addTask={addTask} formComponents={[taskTitle, taskDescription, importance, setImportance]} changeMode={changeMode} editTask={editTask} />
            {!tasksArray.length && <h2>Задач нет</h2>}
            <Reorder.Group className="container d-flex align-items-center flex-column mt-lg-5" as="div" axis="y" onReorder={setTasksArray} values={tasksArray}>
            {tasksArray.map((taskObj, i) =>
                <Task
                    changeTask={changeTask}
                    setChangeMode={setChangeMode}
                    deleteTask={deleteTask} num={i+1} task={taskObj}
                    key={taskObj._id} taskCompleted = {taskCompleted}
                />)}
            </Reorder.Group>
    </div>
  )
}

export default App
