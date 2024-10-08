import { useState, useEffect } from 'react';
import './App.css'
import CreateTodo from './components/CreateTodo';
import Todos from './components/Todos';

function App() {

  const [todos, setTodos] = useState([]);
  console.log('**********', todos)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3000/get-todos");
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await res.json();
        console.log(json)
        setTodos(json.data);
      } catch (error) {
				console.log(error)
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <CreateTodo setTodos={setTodos} todos={todos} />
      <Todos todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
