import MainInput from "./MainInput.jsx";
import {Reorder} from "framer-motion";
import Task from "./Task.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodos} from "../redux/slices/todoSlice.js";
import {isAuthSelector} from "../redux/slices/userSlice.js";
import {Navigate} from 'react-router-dom';


export default function ContainerTasks() {
    const dispatch = useDispatch();
    const {todos} = useSelector(state => state.todos)

    const isAuth = useSelector(isAuthSelector);

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    const isTodosLoading = todos.status === 'loading'

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    return (
        <>
            <MainInput />
            {!isTodosLoading && todos.items.length === 0 && <h2>Задач нет</h2>}
            <Reorder.Group className="container d-flex align-items-center flex-column mt-lg-5" as="div" axis="y" values={todos.items || []} onReorder={[]}>
                {(isTodosLoading ? [...Array(3)] : todos.items).map((todo, index) =>
                    isTodosLoading ? (<Task key={index} isLoading={true} />):
                    (<Task key={todo._id} num={index+1} task={todo} />)
                )}
            </Reorder.Group>
        </>
    )
}
