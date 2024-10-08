import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState({
    'myTasks': [],
    'highPriority': [],
    'done': []
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now().toString(),
        content: newTask,
        priority: 'normal'  // default priority
      };
      setTasks({
        ...tasks,
        myTasks: [...tasks.myTasks, newTaskObj]
      });
      setNewTask('');
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = source.droppableId;
      const copiedItems = Array.from(tasks[column]);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [column]: copiedItems
      });
    } else {
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destItems = Array.from(tasks[destination.droppableId]);

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
    }
  };

  const deleteTask = (columnId, taskId) => {
    setTasks({
      ...tasks,
      [columnId]: tasks[columnId].filter(task => task.id !== taskId)
    });
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="input-area">
        <input 
          type="text" 
          placeholder="Add new task..." 
          value={newTask} 
          onChange={handleInputChange} 
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          <div className="column">
            <h2>My Tasks</h2>
            <TaskList tasks={tasks.myTasks} columnId="myTasks" onDelete={deleteTask} />
          </div>
          <div className="column high-priority">
            <h2>High Priority</h2>
            <TaskList tasks={tasks.highPriority} columnId="highPriority" onDelete={deleteTask} />
          </div>
          <div className="column done">
            <h2>Completed Tasks</h2>
            <TaskList tasks={tasks.done} columnId="done" onDelete={deleteTask} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
