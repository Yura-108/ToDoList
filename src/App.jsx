import { useState } from 'react'
import './App.css'
import MainInput from "./Components/MainInput.jsx";
import Task from "./Components/task.jsx";

function App() {
    const [tasksArray,setTasksArray] = useState([])
    const [idTask, setIdTask] = useState(0)
    //const [changeMode, setChangeMode] = useState(false)
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
      <h1>ToDoList</h1>
        <MainInput addTask={addTask} />
        <div className="container d-flex align-items-center flex-column mt-lg-5">
            {!tasksArray.length && <h2>Задач нет</h2>}
            {tasksArray.map((taskObj, i) =>
                <Task
                    changeTask={changeTask}
                    deleteTask={deleteTask} num={i+1} task={taskObj}

                    key={taskObj.id} taskCompleted = {taskCompleted}
                />)}
        </div>


    </div>
  )
}

export default App
