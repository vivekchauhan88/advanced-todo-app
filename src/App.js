import { useState } from 'react';
import './App.css';

function App() {
	const [value, setValue] = useState('');
	const [choice, setChoice] = useState('todo');
	const [todo, setTodo] = useState(['todo1', 'todo2', 'todo3']);
	const [inProgress, setInProgress] = useState([
		'inProgress1',
		'inProgress2',
		'inProgress3',
		'inProgress4',
	]);
	const [complete, setComplete] = useState([
		'complete1',
		'complete2',
		'complete3',
		'complete4',
		'complete5',
	]);
	const addTask = () => {
		if (value.trim().length !== 0) {
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
		}
		setValue('');
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
				<div className='taskContainer'>
					<div className='taskContainerHeader'>TO DO</div>
					{todo.map((task) => (
						<div className='task'>{task}</div>
					))}
				</div>
				<div className='taskContainer'>
					<div className='taskContainerHeader'>IN PROGRESS</div>
					{inProgress.map((task) => (
						<div className='task'>{task}</div>
					))}
				</div>
				<div className='taskContainer'>
					<div className='taskContainerHeader'>COMPLETE</div>
					{complete.map((task) => (
						<div className='task'>{task}</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
