import '../App.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const TaskContainer = ({
	tasks,
	heading,
	array,
	column,
	fillEditModal,
	removeTask,
	segregateTasks,
}) => {
	const drop = (e) => {
		const id = e.dataTransfer.getData('taskId');
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].id == id) {
				tasks[i].status = column;
				break;
			}
		}
		segregateTasks(tasks);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	};

	const dragOver = (e) => {
		e.preventDefault();
	};

	const dragStart = (e, id) => {
		e.dataTransfer.setData('taskId', id);
	};

	return (
		<div className='taskContainer' onDrop={drop} onDragOver={dragOver}>
			<div className='taskContainerHeader'>
				{heading} {array.length > 0 ? `(${array.length})` : null}
			</div>

			{array.map((task, i) => (
				<div
					id={task.id}
					className='task'
					key={task.id}
					draggable
					onDragStart={(e) => dragStart(e, task.id)}
				>
					{task.taskName}
					<div className='icons'>
						<AiOutlineEdit
							className='icon'
							onClick={() => fillEditModal(i, column, task)}
						/>
						&nbsp;&nbsp;&nbsp;
						<AiOutlineDelete
							className='icon'
							onClick={() => removeTask(i, column, task.id)}
						/>
					</div>
					<br />
					<br />
					<div className='center'>id: {task.id}</div>
					<br />
					{task.priority}
					<div className='icons'>{task.assignee}</div>
				</div>
			))}
		</div>
	);
};

export default TaskContainer;
