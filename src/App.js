import { useEffect, useState } from 'react';
import './App.css';
import TaskContainer from './components/TaskContainer';
import Modal from './components/Modal';

function App() {
	const [taskName, setTaskName] = useState('');
	const [status, setStatus] = useState('');
	const [priority, setPriority] = useState('');
	const [assignee, setAssignee] = useState('');
	const [storyPoints, setStoryPoints] = useState('');
	const [task, setTask] = useState({});
	const [index, setIndex] = useState('');
	const [column, setColumn] = useState('');
	const [tasks, setTasks] = useState([
		{
			id: 1,
			taskName: 'Feed cows',
			status: 'todo',
			priority: 'P0',
			assignee: 'Vivek',
			storyPoints: '3h',
		},
		{
			id: 2,
			taskName: 'Walk cows',
			status: 'inProgress',
			priority: 'P1',
			assignee: 'Vivek',
			storyPoints: '2h',
		},
		{
			id: 3,
			taskName: 'Pet cows',
			status: 'todo',
			priority: 'P2',
			assignee: 'Vivek',
			storyPoints: '2h',
		},
	]);
	const [todo, setTodo] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [complete, setComplete] = useState([]);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	useEffect(() => {
		segregateTasks();
	}, []);
	const segregateTasks = () => {
		let temp = tasks.filter((task) => {
			return task.status === 'todo';
		});
		setTodo([...todo, ...temp]);
		temp = tasks.filter((task) => {
			return task.status === 'inProgress';
		});
		setInProgress([...inProgress, ...temp]);
		temp = tasks.filter((task) => {
			return task.status === 'complete';
		});
		setComplete([...complete, ...temp]);
	};
	const getIndexFromId = (id) => {
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].id === id) {
				return i;
			}
		}
	};
	const addTaskToList = (temp) => {
		switch (status) {
			case 'todo':
				setTodo([...todo, temp]);
				break;
			case 'inProgress':
				setInProgress([...inProgress, temp]);
				break;
			case 'complete':
				setComplete([...complete, temp]);
				break;
		}
	};
	const removeTaskFromList = (column, index) => {
		switch (column) {
			case 'todo':
				setTodo([...todo.slice(0, index), ...todo.slice(index + 1)]);
				break;
			case 'inProgress':
				setInProgress([
					...inProgress.slice(0, index),
					...inProgress.slice(index + 1),
				]);
				break;
			case 'complete':
				setComplete([
					...complete.slice(0, index),
					...complete.slice(index + 1),
				]);
				break;
		}
	};
	const createTask = () => {
		if (taskName.trim().length === 0) {
			alert('Task Name field cannot be empty');
			setTaskName('');
			return;
		}
		if (assignee.trim().length === 0) {
			alert('Assignee field cannot be empty');
			setAssignee('');
			return;
		}
		if (storyPoints.trim().length === 0) {
			alert('Story Points field cannot be empty');
			setStoryPoints('');
			return;
		}
		const temp = {
			id: tasks[0] ? tasks[tasks.length - 1].id + 1 : 1,
			taskName: taskName,
			status: status,
			priority: priority,
			assignee: assignee,
			storyPoints: storyPoints,
		};
		setTasks([...tasks, temp]);
		addTaskToList(temp);
		emptyCreateModal();
		setShowCreateModal(false);
	};
	const removeTask = (i, column, id) => {
		const temp = window.confirm('Do you really want to delete this task?');
		if (!temp) {
			return;
		}
		removeTaskFromList(column, i);
		let index = getIndexFromId(id);
		tasks.splice(index, 1);
	};
	const editTask = () => {
		if (taskName.trim().length === 0) {
			alert('Task Name field cannot be empty');
			setTaskName('');
			return;
		}
		if (assignee.trim().length === 0) {
			alert('Assignee field cannot be empty');
			setAssignee('');
			return;
		}
		if (storyPoints.trim().length === 0) {
			alert('Story Points field cannot be empty');
			setStoryPoints('');
			return;
		}
		task.taskName = taskName;
		task.assignee = assignee;
		task.storyPoints = storyPoints;
		task.status = status;
		task.priority = priority;
		if (column !== status) {
			removeTaskFromList(column, index);
			addTaskToList(task);
		}
		setShowEditModal(false);
	};
	const fillEditModal = (i, column, task) => {
		setShowEditModal(true);
		setTaskName(task.taskName);
		setAssignee(task.assignee);
		setStoryPoints(task.storyPoints);
		setStatus(task.status);
		setPriority(task.priority);
		setTask(task);
		setIndex(i);
		setColumn(column);
	};
	const emptyCreateModal = () => {
		setTaskName('');
		setAssignee('');
		setStoryPoints('');
		setStatus('todo');
		setPriority('P0');
	};

	return (
		<div className='container'>
			<button
				className='addPadding'
				onClick={() => {
					setShowCreateModal(true);
					emptyCreateModal();
				}}
			>
				Create Task
			</button>
			<br />
			<br />
			<div className='innerContainer'>
				<TaskContainer
					heading='TO DO'
					array={todo}
					column='todo'
					fillEditModal={fillEditModal}
					removeTask={removeTask}
				/>
				<TaskContainer
					heading='IN PROGRESS'
					array={inProgress}
					column='inProgress'
					fillEditModal={fillEditModal}
					removeTask={removeTask}
				/>
				<TaskContainer
					heading='COMPLETE'
					array={complete}
					column='complete'
					fillEditModal={fillEditModal}
					removeTask={removeTask}
				/>
			</div>
			<Modal
				title='Create Task'
				onClose={() => setShowCreateModal(false)}
				onSubmit={createTask}
				show={showCreateModal}
			>
				<input
					className='setWidth addPadding'
					placeholder='Task Name'
					onChange={(e) => setTaskName(e.target.value)}
					value={taskName}
				/>
				&nbsp;&nbsp;&nbsp;&nbsp; Status: &nbsp;
				<select
					className='addPadding'
					onChange={(e) => setStatus(e.target.value)}
					value={status}
				>
					<option value='todo'>TO DO</option>
					<option value='inProgress'>IN PROGRESS</option>
					<option value='complete'>COMPLETE</option>
				</select>
				<br />
				<br />
				<input
					className='setWidth addPadding'
					placeholder='Assignee'
					onChange={(e) => setAssignee(e.target.value)}
					value={assignee}
				/>
				&nbsp;&nbsp;&nbsp;&nbsp; Priority: &nbsp;
				<select
					className='addPadding'
					onChange={(e) => setPriority(e.target.value)}
					value={priority}
				>
					<option>P0</option>
					<option>P1</option>
					<option>P2</option>
					<option>P3</option>
				</select>
				<br />
				<br />
				<input
					className='setWidth addPadding'
					placeholder='Story Points'
					onChange={(e) => setStoryPoints(e.target.value)}
					value={storyPoints}
				/>
			</Modal>
			<Modal
				title='Edit Task'
				onClose={() => setShowEditModal(false)}
				onSubmit={editTask}
				show={showEditModal}
			>
				Task Name: &nbsp;
				<input
					className='setWidth addPadding'
					placeholder='Task Name'
					onChange={(e) => setTaskName(e.target.value)}
					value={taskName}
				/>
				&nbsp;&nbsp;&nbsp;&nbsp; Status: &nbsp;
				<select
					className='addPadding'
					onChange={(e) => setStatus(e.target.value)}
					value={status}
				>
					<option value='todo'>TO DO</option>
					<option value='inProgress'>IN PROGRESS</option>
					<option value='complete'>COMPLETE</option>
				</select>
				<br />
				<br />
				Assigne: &nbsp;
				<input
					className='setWidth addPadding'
					placeholder='Assignee'
					onChange={(e) => setAssignee(e.target.value)}
					value={assignee}
				/>
				&nbsp;&nbsp;&nbsp;&nbsp; Priority: &nbsp;
				<select
					className='addPadding'
					onChange={(e) => setPriority(e.target.value)}
					value={priority}
				>
					<option>P0</option>
					<option>P1</option>
					<option>P2</option>
					<option>P3</option>
				</select>
				<br />
				<br />
				Story Points: &nbsp;
				<input
					className='setWidth addPadding'
					placeholder='Story Points'
					onChange={(e) => setStoryPoints(e.target.value)}
					value={storyPoints}
				/>
			</Modal>
		</div>
	);
}

export default App;
