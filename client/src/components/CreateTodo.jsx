import { useState } from "react";

function CreateTodo({ setTodos, todos }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

	const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

	const addTodo = async () => {
    const newTodo = {
      title: title,
      description: description,
    };

    try {
      const response = await fetch("http://localhost:3000/add-todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const result = await response.json();
			console.log(result)

			await setTodos([...todos, newTodo]);
      console.log('Todo added successfully:', result);
			alert('Todo Added')
      
      // Reset title and description after successful addition
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

	return(
		<div>
			<input
				type="text" 
				placeholder="Enter Title" 
				style={{ padding: '5px' }} 
				onChange={handleTitleChange}
			/>
			<br />
			<input
				type="text"
				placeholder="Enter Description"
				style={{ padding: '5px' }} 
				onChange={handleDescChange}
			/>
			<br />
			<button
				onClick={addTodo}
				style={{ padding: '5px' }}
			> Add Todo
			</button>
		</div>
	)
}

export default CreateTodo;