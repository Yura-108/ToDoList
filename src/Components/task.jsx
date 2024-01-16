import './task.scss'
import {useEffect, useRef, useState} from "react";
import {Reorder} from "framer-motion";
import {motion} from "framer-motion";


export default function Task({num, task, deleteTask, changeTask, taskCompleted, setChangeMode}) {
    const [wrapTask, setWrapTask] = useState(false)
    const checkbox = useRef(null)

    const edit = () => {
        changeTask(task.id, task.title, task.description, task.importance)
        setChangeMode(true)
        setWrapTask(true)
    }

    return (
        <Reorder.Item className={wrapTask ? "task wrap" : "task"} as="div" value={task}>
            <div className="headerTask">
                <div className="title">
                    <h2>{num}.</h2>
                    <motion.h2
                        className={task.completed ? "mainText completed": "mainText"}
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        {task.title}
                    </motion.h2>
                </div>
                <div className="panel">
                    <input checked={task.completed} className="checkbox" ref={checkbox}
                           onChange={() => taskCompleted(checkbox.current.checked, task.id)} type="checkbox"/>
                    <button onClick={() => edit()}
                            id="btnEdit"><i className="bi bi-pencil-square"></i></button>
                    <button id="btnDelete" onClick={() => deleteTask(task.id)}><i className="bi bi-x-octagon"></i></button>
                    <button id="unwrap" onClick={() => setWrapTask(!wrapTask)}>
                        <i className={wrapTask ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>
                    </button>
                </div>
            </div>
            <div className="contentTask">
                <div className="description">
                    <h6>description: </h6>
                    <p>{task.description}</p>
                </div>
                <div className="time">
                    <h6>Time:</h6>
                    <h6 style={{marginLeft: "10px"}}>{task.date.currentTime}</h6>
                </div>
                <div className="date">
                    <h6>Date: </h6>
                    <h6 style={{marginLeft: "10px"}}>{task.date.formattedDate}</h6>
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
                    <div className={"tag btn btn-" + task.importance}>{task.importance}</div>
                </div>
                <div className="deadline">
                    <h6>deadline: </h6>
                </div>
            </div>
        </Reorder.Item>
    )
}