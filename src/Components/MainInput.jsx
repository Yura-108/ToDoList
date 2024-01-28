import {useEffect, useRef, useState} from "react";
import './styles/mainInput.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchAddTodo, fetchEditTodo} from "../redux/slices/todoSlice.js";
import {mode, id, toggle} from "../../server/controllers/EditMode.js";


export default function MainInput({}) {
    const refTitle = useRef(null);
    const refDescription = useRef(null);
    const refDate = useRef(null);
    const refTime = useRef(null);
    const [importance, setImportance] = useState('low')


    const dispatch = useDispatch()
    const editMode = useSelector(mode);
    const {todos} = useSelector(state => state.todos)
    const _id = useSelector(id)
    const targetTodo = todos.items.find(todo => todo._id === _id)


    const changeFormatDate = (date, format) => {
        if (format === '-') {
            const arr = date.split(':')
            return  arr[2] + '-' + arr[1] + '-' + arr[0];
        }
        if (format === ':') {
            const arr = date.split('-')
            return  arr[2] + ':' + arr[1] + ':' + arr[0];
        }
    }

    useEffect(() => {
        if (editMode) {
            refTitle.current.value = targetTodo.title;
            refDescription.current.value = targetTodo.description;
            setImportance(targetTodo.importance)
            refDate.current.value = changeFormatDate(targetTodo.date, '-');
            refTime.current.value = targetTodo.time;
        }
    }, [editMode]);


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

    const submit = async (e) => {
        if (!editMode) {
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
            const newTodo = {
                title,
                description,
                time: currentTime,
                date: currentDate,
                importance, completed: false,
                deadline,
            }
            await dispatch(fetchAddTodo(newTodo))
            refTitle.current.value = ''
            refDescription.current.value = ''
            setImportance("low")
        } else {
            e.preventDefault()
            dispatch(fetchEditTodo({
                ...targetTodo,
                title: refTitle.current.value,
                description: refDescription.current.value,
                importance: importance,
                deadline: changeFormatDate(refDate.current.value, ':') + ' | ' + refTime.current.value
            }))
            refTitle.current.value = ''
            refDescription.current.value = ''
            setImportance("low")
            dispatch(toggle())
        }
    }

    useEffect(() => {
       refTitle.current.focus()
    }, [])

    return (
        <div className="container mainInput">
            {editMode && <h2>Editing a task</h2>}
            {!editMode && <h2>Adding a new task</h2>}
            <form onSubmit={submit} method="POST">
                <input id="titleInput" placeholder="Title..." required ref={refTitle} type="text"/>
                <input id="descriptionInput" placeholder="description..." required ref={refDescription} type="text"/>
                <div className="importance">
                    <h4>The importance of the task: </h4>
                    <div onClick={() => setImportance('low')} className={importance === "low" ? "btn btn-success active" :"btn btn-success"}>low</div>
                    <div onClick={() => setImportance('middle')} className={importance === "middle" ? "btn btn-warning active" :"btn btn-warning"}>middle</div>
                    <div onClick={() => setImportance('high')} className={importance === "high" ? "btn btn-danger active" :"btn btn-danger"}>high</div>
                </div>
                <div className="deadline">
                    <h3>Deadline:</h3>
                    <input id="inputDate" ref={refDate} defaultValue={getCurrentDate('-')} min={getCurrentDate('-')} type="date"/>
                    <input id="inputTime" ref={refTime} defaultValue={getCurrentTime()} type="time"/>
                </div>
                {!editMode && <button onSubmit={() => submit()} className="btn btn-success">Add Task</button>}
                {editMode && <button onSubmit={() => submit()} className="btn btn-primary">Edit Task</button>}
            </form>
        </div>
    )
}