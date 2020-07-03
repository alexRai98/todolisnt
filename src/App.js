import React, { useState } from 'react';
import logo from './images/todoisnt-logo.png'
import plusIcon from './images/icons/plus.svg'
import taskCompletedIcon from './images/icons/checkbox-checked.svg'
import taskUncompletedIcon from './images/icons/checkbox.svg'
import './App.css';

const Logo =()=>{
  return <img className="App-logo" src={logo} alt="logo" />
}

const Task=({task})=>{
  const [isCompleted,setIsCompleted]=useState(false);

  const mouseEnter=()=>{
    setIsCompleted(true);
  }
  const mouseLeave=()=>{
    setIsCompleted(false);
  }
  const setStyle=()=>{
    const styleType = isCompleted?"none":"block";
    return {display:styleType};
  }
  const setStyleCompleted=()=>{
    const styleType = isCompleted?"block":"none";
    return {display:styleType};
  }
  return(
  <div className="Task">
    <div 
    onMouseEnter={() => mouseEnter()}
    onMouseLeave={() => mouseLeave()}
    >
    <img alt="task-uncompleted" style={setStyle()} src={taskUncompletedIcon} />
    <img alt="task-completed" style={setStyleCompleted()} src={taskCompletedIcon} />
    </div>
  <p className="Task__body">{task.task}</p>
  </div>)
  }


function App() {
 
  const [addTask,setAddTask]=useState(false);

  const hiddeCreate=()=>{
    const displayType= addTask? "none":"flex";
    return {display:displayType};
  }

  const hiddeCreateForm=()=>{
    const displayType= addTask? "block":"none";
    return {display:displayType};
  }
  const [tasks,setTasks]=useState([]);
  const CreateTask=({tasks,setTasks})=>{
    
    const [id,setId] = useState(1);
    const [input,setInput]=useState("");
    const handleSubmit=(e)=>{
      e.preventDefault();
      setTasks([...tasks,
        {
        id:id,
        task:input
        }
      ]);
      console.log(tasks);
      setId(id+1)
      setInput("");
    }
  
    const handleInputChange=(event)=>{
      setInput(event.target.value)
    }
    return(
    <form 
      style={hiddeCreateForm()}
      className="create-task-form"
      onSubmit={handleSubmit}>
      <input 
      value={input}
      onChange={handleInputChange}
      type="text" 
      name="task"
      className="create-task-form__input" 
      placeholder="Write a todo..."/>
      <div className="create-task-form__buttons">
        <button className="create-task__action" type="submit" >Add</button>
        <button onClick={()=>setAddTask(false)} className="create-task__cancel btn-undefined">Cancel</button>
      </div>
    </form>)
  }
  
  return (
    <main className="App">
      <Logo/>
      <section className="Tasks-list">
        <h2 className="section__title">Todos</h2>
        
        {tasks.map((task)=>(
          <Task task={task}/>
        ))}

        <button
         onClick={()=>setAddTask(true)}
         style={hiddeCreate()} 
         className="Task-add btn-undefined"><img alt="plus" src={plusIcon}/> Add task</button>
        <CreateTask tasks={tasks} setTasks={setTasks}/>
      </section>
      
    </main>
  );
}

export default App;
