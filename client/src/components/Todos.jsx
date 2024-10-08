function Todos({todos, setTodos}) {

	console.log('&&&&&&&&&&&&&',todos)

  const clickHandler = async (data) => {
    console.log('hi there folks', data);
		const payload = {
			id: data._id
		};

		const response = await fetch("http://localhost:3000/mark-done", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error('Failed to add todo');
		}

		const result = await response.json();
		console.log(result);
		alert("updated")

		setTodos((prevTodos) => 
			prevTodos.map((todo) =>
				todo._id === data._id ? { ...todo, isCompleted: true } : todo
			)
		);

		return result;
  };


  return (
    <div>
      {todos ? (
        todos.map((data) => (
          <div key={data._id}>
            <h1>{data.title}</h1>
            <h4>{data.description}</h4>
            <button onClick={() => clickHandler(data)}>
              {data.isCompleted ? 'Done' : 'Mark as Read'}
            </button>
          </div>
        ))
      ) : (
        <p>Loading todos...</p>
      )}
    </div>
  );
}

export default Todos;
