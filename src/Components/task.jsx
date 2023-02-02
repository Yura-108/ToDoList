import './task.scss'
import {useRef, useState} from "react";

export default function Task({num, task, deleteTask, changeTask, taskCompleted}) {
    //const [taskClasses, setTaskClasses] = useState('ms-3')

    const checkbox = useRef(null)

    return (
        <div className="task">
            <h2>{num}.</h2><h2 className={task.completed ? "ms-3 completed" : "ms-3"}>{task.text}</h2>
            <input ref={checkbox} onClick={() => taskCompleted(checkbox.current.checked, task.id)} type="checkbox"/>
            <button onClick={() => changeTask(task.id)} className="btn btn-primary">Изменить</button>
            <button onClick={() => deleteTask(task.id)} className="btn btn-danger">Удалить</button>
        </div>
    )
}