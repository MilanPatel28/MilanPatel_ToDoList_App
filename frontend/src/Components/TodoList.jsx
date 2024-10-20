import React from 'react';

const TodoList = ({ todos, onToggleComplete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted">No tasks yet. Add your first task!</p>
      </div>
    );
  }

  return (
    <div className="list-group">
      {todos.map((todo) => (
        <div 
          key={todo._id}
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <div className="form-check flex-grow-1">
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => onToggleComplete(todo._id, e.target.checked)}
              id={`todo-${todo._id}`}
            />
            <label 
              className={`form-check-label ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
              htmlFor={`todo-${todo._id}`}
            >
              <div className="fw-bold">{todo.title}</div>
              {todo.description && (
                <div className="text-muted small">{todo.description}</div>
              )}
              <div className="text-muted smaller">
                {new Date(todo.createdAt).toLocaleDateString()}
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;