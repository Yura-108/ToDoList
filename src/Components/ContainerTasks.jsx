import MainInput from "./MainInput.jsx";
import { Reorder } from "framer-motion";
import Task from "./Task.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/slices/todoSlice.js";
import { isAuthSelector, logout } from "../redux/slices/userSlice.js";
import { Navigate } from "react-router-dom";
import { changeState, visibilityOfForm } from "../redux/slices/addButtonSlice.js";
import { motion } from "framer-motion";
import { sortByTitle, sortByDate, sortByDeadline } from "./moduls/sortingFunctions.js";


export default function ContainerTasks() {
	const addButton = useSelector(visibilityOfForm);

	const dispatch = useDispatch();
	const { todos } = useSelector(state => state.todos);



	const isTodosLoading = todos.status === "loading";

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	const newTodos = [...todos.items];
	const [methodOfSort, setMethodOfSort] = useState('title')
	switch (methodOfSort) {
		case 'title':
			sortByTitle(newTodos)
			break
		case 'date':
			sortByDate(newTodos)
			break
		case 'deadline':
			sortByDeadline(newTodos)
			break
	}

	return (
		<>
			{addButton && <MainInput />}

			{!isTodosLoading && todos.items.length === 0 && <h2>Задач нет</h2>}

			<Reorder.Group className="containerTask" as="div" axis="y"
										 values={todos.items || []} onReorder={[]}>
				<div className="sortPanel">
					<i style={{color: "#198754"}} onClick={() => setMethodOfSort('title')} className="bi bi-paragraph"></i>
					<i onClick={() => setMethodOfSort('date')} className="bi bi-alarm"></i>
					<i onClick={() => setMethodOfSort('deadline')} className="bi bi-hourglass-split"></i>

				</div>
				{(isTodosLoading ? [...Array(3)] : newTodos).map((todo, index) =>
					isTodosLoading ? (<Task key={index} isLoading={true} />) :
						(<Task key={todo._id} num={index + 1} task={todo} />)
				)}
			</Reorder.Group>
			{!addButton && <motion.div className={"containerAddBtn"}
																 animate={{ opacity: 1 }}
																 initial={{ opacity: 0 }}
																 transition={{ duration: 0.5 }}>
				<button className={"btn btn-success"} onClick={() => dispatch(changeState(true))}>Add new task</button>
			</motion.div>
			}
		</>
	);
}
