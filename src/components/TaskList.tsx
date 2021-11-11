import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if(newTaskTitle.trim() !== '') {
      const newTask = {
        id: Math.floor(Date.now() * Math.random()),
        title: newTaskTitle,
        isComplete: false,
      }
      setTasks([...tasks, newTask ])
      setNewTaskTitle('');

    }
  }

  function handleToggleTaskCompletion(id: number) {
    
    const taskCkecked = tasks.filter(task => task.id === id).reduce((cur) => cur)
    taskCkecked.isComplete = !taskCkecked.isComplete;
    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id))
  }


  return (
    <div className="container">
    <section className="task-list container-tasks">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  </div>  
  )
}