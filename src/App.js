import { useState } from 'react';
import './App.css';

let nextId = 1;

function App() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState('');

  function addTodo(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: nextId++, text, done: false }]);
    setDraft('');
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <main className="todo-panel">
        <h1 className="todo-title">To-do</h1>

        <button
          type="button"
          className="test-button"
          onClick={() =>
            console.log("I'm gonna make him an offer he can't refuse")
          }
        >
          Test
        </button>

        <form className="todo-form" onSubmit={addTodo}>
          <label htmlFor="new-todo" className="visually-hidden">
            New task
          </label>
          <input
            id="new-todo"
            type="text"
            className="todo-input"
            placeholder="Add a task…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="todo-add">
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="todo-empty">No tasks yet. Add one above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((t) => (
              <li key={t.id} className="todo-item">
                <label className="todo-row">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTodo(t.id)}
                  />
                  <span className={t.done ? 'todo-text done' : 'todo-text'}>
                    {t.text}
                  </span>
                </label>
                <button
                  type="button"
                  className="todo-delete"
                  onClick={() => removeTodo(t.id)}
                  aria-label={`Delete: ${t.text}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
