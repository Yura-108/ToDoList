import './task.scss'
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

export default function Task({num, task, deleteTask, changeTask, taskCompleted}) {
    const [changeMode, setChangeMode] = useState(false)

    const checkbox = useRef(null)
    const changeInput = useRef(null)


    const submit = (e) => {
        e.preventDefault()
        changeTask(changeInput.current.value, task.id)
        setChangeMode(false)
    }

    useEffect(() => {
        if (changeMode) {
            changeInput.current.value = task.text
            changeInput.current.focus()
        }
    }, [changeMode])



    return (
        <div className="task">
            {!changeMode && <>
                <h2>{num}.</h2><h2 className={task.completed ? "ms-3 completed" : "ms-3"}>{task.text}</h2>
                <input className="checkbox" ref={checkbox} onClick={() => taskCompleted(checkbox.current.checked, task.id)} type="checkbox"/>
                <button disabled={task.completed} onClick={() => {setChangeMode(true)}} className="btn btn-primary">Изменить</button>
                <button onClick={() => deleteTask(task.id)} className="btn btn-danger">Удалить</button>
            </>
            }
            {changeMode &&
                <form action="" onSubmit={submit}>
                    <h2>{num}.</h2>
                    <input ref={changeInput} required type="text"/>
                    <button className="btn btn-success ms-auto">Save</button>
                </form>
            }
        </div>
    )
}