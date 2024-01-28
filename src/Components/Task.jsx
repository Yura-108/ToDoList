import './styles/task.scss'
import {useRef, useState} from "react";
import {Reorder} from "framer-motion";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {fetchDeleteTodo, fetchEditTodo} from "../redux/slices/todoSlice.js";
import {mode, toggle} from "../../server/controllers/EditMode.js";

export default function Task({num, task, isLoading = false}) {
    const [wrapTask, setWrapTask] = useState(false)
    const checkbox = useRef(null)

    const dispatch = useDispatch();
    const editMode = useSelector(mode)

    const deleteTodo = (id) => {
        if (window.confirm('Are you sure want to delete your task?')) {
            dispatch(fetchDeleteTodo(id))
        }
    }
    const editTodo = (obj) => {
        dispatch(fetchEditTodo({...obj, completed: checkbox.current.checked}))
    }


    const edit = () => {
        if (editMode) {
            setWrapTask(false)
        } else {
            setWrapTask(true)
        }

        dispatch(toggle(task._id));
    }

    return (
        (isLoading ? (<div></div>) :
            <Reorder.Item className={wrapTask ? "task wrap" : "task"} as="div" value={task}>
            <div className="headerTask">
                <div className="title">
                    <h2 style={{width: "25px"}}>{num}.</h2>
                    <motion.h2
                        className={task.completed ? "mainText completed": "mainText"}
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        {task.title}
                    </motion.h2>
                </div>
                <div className="panel">
                    <div className={`tag ${task.importance}`}>{task.importance}</div>
                    <input checked={task.completed} className="checkbox" ref={checkbox}
                           onChange={() => editTodo(task)} type="checkbox"/>
                    <button onClick={() => edit()}
                            id="btnEdit"><i className="bi bi-pencil-square"></i></button>
                    <button id="btnDelete" onClick={() => deleteTodo(task._id)}><i className="bi bi-x-octagon"></i></button>
                    <button id="unwrap" onClick={() => setWrapTask(!wrapTask)}>
                        <i className={wrapTask ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>
                    </button>
                </div>
            </div>
            <div className="contentTask">
                <div className="description">
                    <h6>description: </h6>
                    <h6 style={{marginLeft: "10px"}}>{task.description}</h6>
                </div>
                <div className="date">
                    <h6>Date of addition: </h6>
                    <h6 style={{marginLeft: "10px"}}>{task.date} | {task.time}</h6>
                </div>
                <div className="completedInfo">
                    <h6>completed:
                        <motion.span
                            style={{
                                color: task.completed ? "#198754" : "#dc3545",
                                marginLeft: "10px",
                            }}
                            animate={{ opacity: 1, color: task.completed ? "#198754" : "#dc3545" }}
                            initial={{ opacity: 0, color: "#198754" }}
                            transition={{ duration: 0.7 }}>
                            {task.completed ? "The task is completed" : "The task is not completed"}
                        </motion.span>
                    </h6>
                </div>
                <div className="importance">
                    <h6>importance: </h6>
                    <div className={`tag ${task.importance}`}>{task.importance}</div>
                </div>
                <div className="deadline">
                    <h6>deadline:</h6>
                    <h6 style={{marginLeft: "10px"}}>{task.deadline}</h6>
                </div>
            </div>
        </Reorder.Item>
        )
    )
}