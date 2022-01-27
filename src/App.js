import { useState } from 'react';
import './App.css';
import TaskContainer from './components/TaskContainer';

function App() {
	const [value, setValue] = useState('');
	const [choice, setChoice] = useState('todo');
	const [todo, setTodo] = useState(['todo1', 'todo2']);
	const [inProgress, setInProgress] = useState(['inProgress1']);
	const [complete, setComplete] = useState([
		'complete1',
		'complete2',
		'complete3',
	]);
	const addTask = () => {
		if (value.trim().length === 0) {
			setValue('');
			return;
		}
		switch (choice) {
			case 'todo':
				setTodo([...todo, value]);
				break;
			case 'inProgress':
				setInProgress([...inProgress, value]);
				break;
			case 'complete':
				setComplete([...complete, value]);
				break;
		}
		setValue('');
	};
	const removeTask = (i, column) => {
		const temp = window.confirm('Do you really want to delete this task?');
		if (!temp) {
			return;
		}
		switch (column) {
			case 'todo':
				setTodo([...todo.slice(0, i), ...todo.slice(i + 1)]);
				break;
			case 'inProgress':
				setInProgress([
					...inProgress.slice(0, i),
					...inProgress.slice(i + 1),
				]);
				break;
			case 'complete':
				setComplete([
					...complete.slice(0, i),
					...complete.slice(i + 1),
				]);
				break;
		}
	};
	const editTask = (i, column) => {
		const temp = window.prompt('Enter the new task');
		if (!temp || temp.trim().length === 0) {
			return;
		}
		switch (column) {
			case 'todo':
				setTodo([...todo.slice(0, i), temp, ...todo.slice(i + 1)]);
				break;
			case 'inProgress':
				setInProgress([
					...inProgress.slice(0, i),
					temp,
					...inProgress.slice(i + 1),
				]);
				break;
			case 'complete':
				setComplete([
					...complete.slice(0, i),
					temp,
					...complete.slice(i + 1),
				]);
				break;
		}
	};

	return (
		<div className='container'>
			<input
				className='addTask addPadding'
				placeholder='Task Name'
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>
			&nbsp;
			<select
				className='addPadding'
				onChange={(e) => setChoice(e.target.value)}
			>
				<option value='todo'>TO DO</option>
				<option value='inProgress'>IN PROGRESS</option>
				<option value='complete'>COMPLETE</option>
			</select>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<button className='addPadding' onClick={addTask}>
				Add Task
			</button>
			<br />
			<br />
			<div className='innerContainer'>
				<TaskContainer
					heading='TO DO'
					array={todo}
					column='todo'
					editTask={editTask}
					removeTask={removeTask}
				/>
				<TaskContainer
					heading='IN PROGRESS'
					array={inProgress}
					column='inProgress'
					editTask={editTask}
					removeTask={removeTask}
				/>
				<TaskContainer
					heading='COMPLETE'
					array={complete}
					column='complete'
					editTask={editTask}
					removeTask={removeTask}
				/>
			</div>
		</div>
	);
}

export default App;
