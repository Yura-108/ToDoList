import { useEffect, useRef, useState } from "react";
import "./styles/mainInput.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddTodo, fetchEditTodo } from "../redux/slices/todoSlice.js";
import { mode, id, toggle, disable } from "../redux/slices/editModeSlice.js";
import { changeState } from "../redux/slices/addButtonSlice.js";
import { motion } from "framer-motion";



export default function MainInput({}) {
	const refTitle = useRef(null);
	const refDescription = useRef(null);
	const refDate = useRef(null);
	const refTime = useRef(null);
	const [importance, setImportance] = useState("low");


	const dispatch = useDispatch();
	const editMode = useSelector(mode);
	const { todos } = useSelector(state => state.todos);
	const _id = useSelector(id);
	const targetTodo = todos.items.find(todo => todo._id === _id);


	const changeFormatDate = (date, format) => {
		if (format === "-") {
			const arr = date.split(":");
			return arr[2] + "-" + arr[1] + "-" + arr[0];
		}
		if (format === ":") {
			const arr = date.split("-");
			return arr[2] + ":" + arr[1] + ":" + arr[0];
		}
	};

	useEffect(() => {
		if (editMode) {
			refTitle.current.value = targetTodo.title;
			refDescription.current.value = targetTodo.description;
			setImportance(targetTodo.importance);
			refDate.current.value = changeFormatDate(targetTodo.deadline.slice(0, 10), "-");
			refTime.current.value = targetTodo.deadline.slice(13, 18)
		}
	}, [editMode]);

	const clearForm = () => {
		refTitle.current.value = "";
		refDescription.current.value = "";
		setImportance("low");
		refTime.current.value = ''
	}

	const getCurrentDate = (format = "") => {
		let currentDate = new Date();
		let day = currentDate.getDate();
		let month = currentDate.getMonth() + 1; // Месяцы начинаются с 0
		let year = currentDate.getFullYear();
		day = (day < 10) ? "0" + day : day;
		month = (month < 10) ? "0" + month : month;
		if (format === "-") {
			return year + "-" + month + "-" + day;
		} else {
			return day + ":" + month + ":" + year;
		}

	};
	const getCurrentTime = () => {
		let currentDate = new Date();
		let hour = currentDate.getHours();
		let minutes = currentDate.getMinutes();
		let seconds = currentDate.getSeconds();

		hour = (hour < 10) ? "0" + hour : hour;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;
		return hour + ":" + minutes + ":" + seconds;
	};
	const submit = async (e) => {
		if (!editMode) {
			e.preventDefault();
			const title = refTitle.current.value;
			const description = refDescription.current.value;
			const currentTime = getCurrentTime();
			const currentDate = getCurrentDate();
			const deadline = changeFormatDate(refDate.current.value, ':') + ' | ' + refTime.current.value;
			const newTodo = {
				title,
				description,
				time: currentTime,
				date: currentDate,
				importance, completed: false,
				deadline
			};
			clearForm()
			await dispatch(fetchAddTodo(newTodo));

		} else {
			e.preventDefault();
			dispatch(fetchEditTodo({
				...targetTodo,
				title: refTitle.current.value,
				description: refDescription.current.value,
				importance: importance,
				deadline: changeFormatDate(refDate.current.value, ":") + " | " + refTime.current.value
			}));
			clearForm()
			dispatch(toggle());
		}
	};

	const changeModes = () => {
		dispatch(changeState(false));
		dispatch(disable())
	}

	useEffect(() => {
		refTitle.current.focus();
	}, []);



	return (
		<motion.div
			className="container mainInput"
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 0.5 }}>

			<div className="title">
				{!editMode && <h2>Adding a new task</h2>}
				{editMode && <h2>Editing a task</h2>}
				<i onClick={() => changeModes()} className="cross bi bi-x-lg"></i>
			</div>

			<form name={"taskForm"} onSubmit={submit} method="POST">
				<input id="titleInput" placeholder="Title..." required ref={refTitle} type="text" />
				<input id="descriptionInput" placeholder="description..." required ref={refDescription} type="text" />
				<div className="importance">
					<h4>The importance of the task: </h4>
					<div onClick={() => setImportance("low")}
							 className={importance === "low" ? "btn btn-success active" : "btn btn-success"}>low
					</div>
					<div onClick={() => setImportance("middle")}
							 className={importance === "middle" ? "btn btn-warning active" : "btn btn-warning"}>middle
					</div>
					<div onClick={() => setImportance("high")}
							 className={importance === "high" ? "btn btn-danger active" : "btn btn-danger"}>high
					</div>
				</div>
				<div className="deadline">
					<h3>Deadline:</h3>
					<input id="inputDate" ref={refDate} defaultValue={getCurrentDate("-")} min={getCurrentDate("-")}
								 type="date" />
					<input id="inputTime" ref={refTime} type="time" required />
				</div>
				{!editMode && <button onSubmit={() => submit()} className="btn btn-success">Add Task</button>}
				{editMode && <button onSubmit={() => submit()} className="btn btn-primary">Edit Task</button>}
			</form>
		</motion.div>
	);
}