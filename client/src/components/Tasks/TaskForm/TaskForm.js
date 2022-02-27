import { useCallback, useEffect, useState } from 'react';
import { useTaskState } from '../../../context/TaskContext';
import { Button } from '../../Button/Button';
import DisplayTasks from '../DisplayTasks/DisplayTasks';


function TaskForm() {
	const taskState = useTaskState();
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState('');

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setInput('');
	};

	const sendTasks = async () => {
		if (input.trim() !== '') {
			const response = await fetch('http://localhost:3001/tasks/add', {
				method: 'POST',
				headers: { 
					'Content-Type': 'application/json',
					"x-access-token": taskState.user.token
			},
				body: JSON.stringify({
					name: input,
					user_id: taskState.user.id,
					completed: false,
				}),
			});
			console.log('Tasks sended!');
			
			// Display tasks after every submit
			getTasks()
	
		} else {
			console.warn('Empty string!');
		}
	};


	const getTasks = useCallback(async () => {
		const response = await fetch(`http://localhost:3001/tasks/get/${taskState.user.id}`, {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				"x-access-token": taskState.user.token
		}
		});
		const data = await response.json();
		setTasks(data)	
	}, [input]);


	// Display tasks every time the setTasks is changed to prevent a loop
	useEffect(()=>{
		getTasks()
	}, [getTasks])
	

	const deleteTasks = async (taskId) => {
		try {
			await fetch(`http://localhost:3001/tasks/delete`, {
				method: 'DELETE',
				headers: { 
					'Content-Type': 'application/json',
					"x-access-token": taskState.user.token
				},
				body: JSON.stringify({
					_id: taskId,
				  })
			});
			// Call the function to get the tasks after deletion 
			getTasks()
		} catch (error) {
			console.log(error);
		}
		
	};
	const updateTasks = async (taskId,completedStatus) => {
		let isCompleted = completedStatus
		try {
			const checked =()=>{
				if(!isCompleted){
					return isCompleted = true			
				}else{
					return isCompleted = false
				}
			}
			checked()
			await fetch(`http://localhost:3001/tasks/update`, {
				method: 'PUT',
				headers: { 
					'Content-Type': 'application/json',
					"x-access-token": taskState.user.token
				},
				body: JSON.stringify({
					_id: taskId,
					completed: isCompleted
					
				  })
			});
			// Call the function to get the tasks after update
			getTasks()
		} catch (error) {
			console.log(error);
		}
		
	};

	return (
		<div className="container flex-column input-container w-50 p-3 border">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="form-control"
					name="task"
					value={input}
					onChange={handleChange}
					placeholder="Add tasks"
					autoComplete="on"
				/>

				<div className="d-grid gap-2">
					<Button onClick={sendTasks} text={'Add task'} />
				</div>
			</form>
			<DisplayTasks tasks={tasks} deleteTasks={deleteTasks} updateTasks={updateTasks}/>
		</div>
	);
}

export default TaskForm;
