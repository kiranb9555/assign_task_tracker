import { useState } from 'react'
import './App.css'

const TaskCard = ({ title, completed, onToggle }) => (
  <article className={`task-card ${completed ? 'completed' : ''}`}>
    <input type="checkbox" checked={completed} onChange={onToggle} />
    <div className="task-content">
      <p className="task-title">{title}</p>
      <p className="task-status">
        {completed ? 'All wrapped up.' : "Tap the checkbox once you're done."}
      </p>
    </div>
    <span className={`status-pill ${completed ? '' : 'pending'}`}>
      {completed ? 'Completed' : 'Pending'}
    </span>
  </article>
)

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    setTasks((prev) => [{ title: trimmed, completed: false }, ...prev])
    setTitle('')
  }

  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((task, idx) =>
        idx === index ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  return (
    <main className="app-shell">
      <section className="panel">
        <header className="panel__header">
          <p className="eyebrow">Productivity Capsule</p>
          <h1>Task Tracker</h1>
          <p className="subtitle">
            Capture tasks quickly, mark them done with a tap, and keep your day
            flowing.
          </p>
        </header>

        <form className="task-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="task-input">
            Add a new task
          </label>
          <input
            id="task-input"
            type="text"
            placeholder="Type your next move"
            autoComplete="off"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <button type="submit">Add Task</button>
        </form>

        <section className="task-list" aria-live="polite">
          {tasks.length === 0 ? (
            <p className="placeholder">
              No tasks yet. Start by adding one above.
            </p>
          ) : (
            tasks.map((task, index) => (
              <TaskCard
                key={`${task.title}-${index}`}
                title={task.title}
                completed={task.completed}
                onToggle={() => toggleTask(index)}
              />
            ))
          )}
        </section>
      </section>
    </main>
  )
}

export default App
