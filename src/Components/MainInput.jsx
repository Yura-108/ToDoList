import {useEffect, useRef, useState} from "react";
import './styles/mainInput.scss'
import {useDispatch} from "react-redux";
import {todoAdd} from "../redux/slices/todoSlice.js";

export default function MainInput({}) {
    const refTitle = useRef(null);
    const refDescription = useRef(null);
    const refDate = useRef(null);
    const refTime = useRef(null);
    const [importance, setImportance] = useState('low')
    const dispatch = useDispatch()
    const changeMode = false;

    const getCurrentDate = (format = '') => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // Месяцы начинаются с 0
        let year = currentDate.getFullYear();
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;
        if (format === '-') {
            return year + '-' + month + '-' + day;
        } else {
            return day + ':' + month + ':' + year;
        }

    }
    const getCurrentTime = () => {
        let currentDate = new Date();
        let hour = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        hour = (hour < 10) ? '0' + hour : hour
        minutes = (minutes < 10) ? '0' + minutes : minutes
        return hour + ':' + minutes
    }

    const submit = (e) => {
        if (!changeMode) {
            e.preventDefault();
            const title = refTitle.current.value;
            const description = refDescription.current.value;
            const deadTime = refTime.current.value;
            const deadDate = refDate.current.value;
            const arr = deadDate.split('-')
            const newFormatDeadDate = arr[2] + '.' + arr[1] + '.' + arr[0];
            const currentTime = getCurrentTime();
            const currentDate = getCurrentDate();
            const deadline = newFormatDeadDate + ' | ' + deadTime;

           dispatch(todoAdd({title, description, time: currentTime, date: currentDate, importance, completed: false, deadline}))
            refTitle.current.value = ''
            refDescription.current.value = ''
            setImportance("success")
        } else {
            e.preventDefault()
            const title = refTitle.current.value
            const description = refDescription.current.value
            //editTask(title, description, importance)
            refTitle.current.value = ''
            refDescription.current.value = ''
            setImportance("low")

        }
    }

    useEffect(() => {
       refTitle.current.focus()
    }, [])

    return (
        <div className="container mainInput">
            {changeMode && <h2>Editing a task</h2>}
            {!changeMode && <h2>Adding a new task</h2>}
            <form onSubmit={submit} action="">
                <input id="titleInput" placeholder="Title..." required ref={refTitle} type="text"/>
                <input id="descriptionInput" placeholder="description..." required ref={refDescription} type="text"/>
                <div className="importance">
                    <h4>The importance of the task: </h4>
                    <div onClick={() => setImportance('high')} className={importance === "high" ? "btn btn-danger active" :"btn btn-danger"}>high</div>
                    <div onClick={() => setImportance('middle')} className={importance === "middle" ? "btn btn-warning active" :"btn btn-warning"}>middle</div>
                    <div onClick={() => setImportance('low')} className={importance === "low" ? "btn btn-success active" :"btn btn-success"}>low</div>
                </div>
                <div className="deadline">
                    <h3>Deadline:</h3>
                    <input ref={refDate} defaultValue={getCurrentDate('-')} min={getCurrentDate()} type="date"/>
                    <input ref={refTime} defaultValue={getCurrentTime()} type="time"/>
                </div>
                {!changeMode && <button onSubmit={() => submit()} className="btn btn-success">Добавить</button>}
                {changeMode && <button onSubmit={() => submit()} className="btn btn-primary">Изменить</button>}
            </form>
        </div>
    )
}