import {useEffect, useRef} from "react";
import './mainInput.scss'

export default function MainInput({addTask}) {
    const task = useRef(null)

    const submit = (e) => {
        e.preventDefault()
        const textTask = task.current.value
        addTask(textTask)
        task.current.value = ''
    }

    useEffect(() => {
       task.current.focus()
    }, [])

    return (
        <div className="container mainInput">
            <form onSubmit={submit} action="">
                <input placeholder="Добавить новую задачу..." required ref={task} type="text"/>
                <button className="btn btn-success">Добавить</button>
            </form>
        </div>
    )
}