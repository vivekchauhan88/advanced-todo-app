import '../App.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const TaskContainer = ({
	heading,
	array,
	column,
	fillEditModal,
	removeTask,
}) => (
	<div className='taskContainer'>
		<div className='taskContainerHeader'>
			{heading} {array.length > 0 ? `(${array.length})` : null}
		</div>
		{array.map((task, i) => (
			<div className='task' key={task.id}>
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

export default TaskContainer;
