import '../App.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const TaskContainer = ({ heading, array, column, editTask, removeTask }) => (
	<div className='taskContainer'>
		<div className='taskContainerHeader'>{heading}</div>
		{array.map((task, i) => (
			<div className='task'>
				{task}
				<div className='icons'>
					<AiOutlineEdit
						className='icon'
						onClick={() => editTask(i, column)}
					/>
					&nbsp;&nbsp;&nbsp;
					<AiOutlineDelete
						className='icon'
						onClick={() => removeTask(i, column)}
					/>
				</div>
			</div>
		))}
	</div>
);

export default TaskContainer;
