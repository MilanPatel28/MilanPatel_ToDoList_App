import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://milan-patel-to-do-list-app.vercel.app/api/v1/todos', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setTodos(data.data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (todoData) => {
    try {
      const response = await fetch('https://milan-patel-to-do-list-app.vercel.app/api/v1/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(todoData),
      });

      const data = await response.json();
      if (data.success) {
        setTodos([data.data, ...todos]);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleComplete = async (todoId, completed) => {
    try {
      const response = await fetch(`https://milan-patel-to-do-list-app.vercel.app/api/v1/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ completed }),
      });

      const data = await response.json();
      if (data.success) {
        setTodos(todos.map(todo => 
          todo._id === todoId ? { ...todo, completed } : todo
        ));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>My Tasks</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Add New Task'}
            </button>
          </div>

          {showForm && (
            <TodoForm onSubmit={handleAddTodo} onCancel={() => setShowForm(false)} />
          )}

          <TodoList todos={todos} onToggleComplete={handleToggleComplete} />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
