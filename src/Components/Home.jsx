import MainInput from "./MainInput.jsx";
import {Reorder} from "framer-motion";
import Task from "./Task.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodos} from "../redux/slices/todoSlice.js";

export default function Home() {
    const dispatch = useDispatch();
    const {todos} = useSelector(state => state.todos)

    const isTodosLoading = todos.status === 'loading'

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])



    // const [tasksArray, setTasksArray] = useState( [])
    // const [idTask, setIdTask] = useState(JSON.parse(localStorage.getItem('ids')) || 0)
    //
    // const taskTitle = useRef(null)
    // const taskDescription = useRef(null)
    // const [importance, setImportance] = useState('success')
    // const [changeMode, setChangeMode] = useState(false)
    // const [idEditElement, setIdEditElement] = useState(0)
    //
    // const addTask = (title, description, importance ,nowTime) => {
    //     setIdTask(idTask => idTask+1)
    //     setTasksArray([{title, description, importance, completed: false, date: nowTime}, ...tasksArray])
    // }
    // const deleteTask = id => {
    //     setTasksArray(tasksArray.filter(task => task._id !== id))
    // }
    //
    // const changeTask = (id, title, description, importance) => {
    //     taskTitle.current.focus()
    //     setIdEditElement(id)
    //     taskTitle.current.value = title
    //     taskDescription.current.value = description
    //     setImportance(importance)
    // }
    // const editTask = (title, description, importance) => {
    //     setTasksArray(tasksArray.map(task => {
    //         if (task._id === idEditElement) {
    //             return {...task, title, description, importance}
    //         } else {
    //             return {...task}
    //         }
    //     }))
    //     setChangeMode(false)
    // }
    //
    // useEffect(() => {
    //     if (tasksArray) {
    //         localStorage.setItem("ids", JSON.stringify(idTask))
    //         localStorage.setItem("tasks", JSON.stringify(tasksArray))
    //     }
    // }, [tasksArray])
    //
    // const taskCompleted = (check, id) => {
    //     setTasksArray(tasksArray.map(task => {
    //         if(task._id === id) {
    //             return {...task, completed: check}
    //         } else {
    //             return {...task}
    //         }
    //     }))
    // }
    const changeTask = () => {}
    const taskCompleted = () => {}
    const setChangeMode = () => {}
    const deleteTask = () => {}



    return (
        <>
            <MainInput />
            {!isTodosLoading && todos.items.length === 0 && <h2>Задач нет</h2>}
            <Reorder.Group className="container d-flex align-items-center flex-column mt-lg-5" as="div" axis="y" onReorder={todos.items || []} values={todos.items || []}>
                {(isTodosLoading ? [...Array(3)] : todos.items).map((todo, index) =>
                    isTodosLoading ? (<Task key={index} isLoading={true} />):
                    (<Task key={todo._id}
                          changeTask={changeTask} taskCompleted = {taskCompleted}
                          setChangeMode={setChangeMode}
                          deleteTask={deleteTask} num={index+1} task={todo} />)
                )}
            </Reorder.Group>
        </>
    )
}
