import {useEffect, useRef, useState} from "react";
import './mainInput.scss'

export default function MainInput({addTask, formComponents, changeMode, editTask}) {
    const [taskTitle, taskDescription, importance, setImportance] = formComponents

    const submit = (e) => {
        if (!changeMode) {
            e.preventDefault()
            const title = taskTitle.current.value
            const description = taskDescription.current.value

            let currentDate = new Date();
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1; // Месяцы начинаются с 0
            let year = currentDate.getFullYear();
            let hour = currentDate.getHours()
            let minutes = currentDate.getMinutes()

            day = (day < 10) ? '0' + day : day;
            month = (month < 10) ? '0' + month : month;
            hour = (hour < 10) ? '0' + hour : hour
            minutes = (minutes < 10) ? '0' + minutes : minutes

            const formattedDate = day + '.' + month + '.' + year;
            const currentTime = hour + ':' + minutes

            addTask(title, description, importance, {formattedDate, currentTime})
            taskTitle.current.value = ''
            taskDescription.current.value = ''
            setImportance("success")
        } else {
            e.preventDefault()
            const title = taskTitle.current.value
            const description = taskDescription.current.value
            editTask(title, description, importance)
            taskTitle.current.value = ''
            taskDescription.current.value = ''
            setImportance("success")

        }
    }

    useEffect(() => {
       taskTitle.current.focus()
    }, [])

    return (
        <div className="container mainInput">
            {changeMode && <h2>Editing a task</h2>}
            {!changeMode && <h2>Adding a new task</h2>}
            <form onSubmit={submit} action="">
                <input id="titleInput" placeholder="Title..." required ref={taskTitle} type="text"/>
                <input id="descriptionInput" placeholder="description..." required ref={taskDescription} type="text"/>
                <div className="importance">
                    <h4>The importance of the task: </h4>
                    <div onClick={() => setImportance('danger')} className={importance === "danger" ? "btn btn-danger active" :"btn btn-danger"}>really important</div>
                    <div onClick={() => setImportance('warning')} className={importance === "warning" ? "btn btn-warning active" :"btn btn-warning"}>important</div>
                    <div onClick={() => setImportance('success')} className={importance === "success" ? "btn btn-success active" :"btn btn-success"}>no important</div>
                </div>
                <div className="deadline">

                </div>
                {!changeMode &&  <button onSubmit={() => submit()} className="btn btn-success">Добавить</button>}
                {changeMode &&  <button onSubmit={() => submit()} className="btn btn-primary">Изменить</button>}
            </form>
        </div>
    )
}