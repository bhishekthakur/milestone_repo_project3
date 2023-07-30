import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        title: inputValue,
        status: 'pending',
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleStatusChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === 'pending' ? 'completed' : 'pending',
            }
          : todo
      )
    );
  };

  const handleRemoveTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <header>
        <h1>Simple Todo App</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your task"
          />
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span className={`status-${todo.status}`}>
                {todo.status === 'pending' ? 'Todo' : 'Completed'}
              </span>
              <span className="todo-title">{todo.title}</span>
              <div className="todo-actions">
                <button onClick={() => handleStatusChange(todo.id)}>
                  {todo.status === 'pending' ? 'Complete' : 'Pending'}
                </button>
                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
