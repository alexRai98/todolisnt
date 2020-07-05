import React, { useState } from "react";
import logo from "./images/todoisnt-logo.png";
import plusIcon from "./images/icons/plus.svg";
import taskCompletedIcon from "./images/icons/checkbox-checked.svg";
import taskUncompletedIcon from "./images/icons/checkbox.svg";
import "./App.css";

const Logo = () => {
  return <img className="App-logo" src={logo} alt="logo" />;
};

const TaskCompleted = ({ todo }) => {
  return (
    <div className="Task task-completed">
      <img alt="completed" src={taskCompletedIcon} />
      <p className="Task__body task-completed__body">{todo.task}</p>
    </div>
  );
};

const CreateForm = ({hiddeForm,onSend,setAddTask,shangeInput,input,button}) => {

  return (
    <form
      style={hiddeForm()}
      className="create-task-form"
      onSubmit={onSend}
    >
      <input
        value={input}
        onChange={shangeInput}
        type="text"
        name="task"
        className="create-task-form__input"
        placeholder="Write a todo..."
        required
      />
      <div className="create-task-form__buttons">
        <button className="create-task__action" type="submit">
          {button}
        </button>
        <button
          onClick={() => setAddTask(false)}
          type="button"
          className="create-task__cancel btn-undefined"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const CreateTask = ({ tasks, setTasks, addTask, setAddTask }) => {
  const [id, setId] = useState(1);
  const [input, setInput] = useState("");

  const hiddeCreateForm = () => {
    const displayType = addTask ? "block" : "none";
    return { display: displayType };
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: id,
        completed: false,
        task: input,
      },
    ]);
    setId(id + 1);
    setInput("");
  };

  return <CreateForm
  button={"Add"}
  hiddeForm={hiddeCreateForm}
  input={input}
  shangeInput={handleInputChange} 
  onSend={handleSubmit} 
  setAddTask={setAddTask}/>;
};

const Task = ({ todo, onCheck }) => {
  //conts [click,setClick] = useState(false);
  const hundleRederForm = () => {
    console.log("edit")
  };

  return (
    <div className="Task">
      <div className="task-radios" onClick={() => onCheck(todo.id)}>
        <img
          className="task-radios__uncompleted"
          alt="uncompleted"
          src={taskUncompletedIcon}
        />
        <img
          className="task-radios__completed"
          alt="completed"
          src={taskCompletedIcon}
        />
      </div>
      <p
        className="Task__body"
        onClick={hundleRederForm}
      >
        {todo.task}
      </p>
    </div>
  );
};

function App() {
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowcompleted] = useState(false);

  const hiddeCreate = () => {
    const displayType = addTask ? "none" : "flex";
    return { display: displayType };
  };

  const tasksCompleted = () => {
    return tasks.filter((task) => task.completed);
  };

  const tasksUncompleted = () => {
    return tasks.filter((task) => task.completed === false);
  };

  const hundleCompleted = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const hundleShowCompleted = (e) => {
    e.preventDefault();
    setShowcompleted(!showCompleted);
  };

  return (
    <main className="App">
      <Logo />
      <section className="Tasks-list">
        <h2 className="section__title">Todos</h2>

        {tasksUncompleted().map((task) => (
          <Task todo={task} onCheck={hundleCompleted} key={task.id} />
        ))}

        <button
          onClick={() => setAddTask(true)}
          style={hiddeCreate()}
          className="Task-add btn-undefined"
        >
          <img alt="plus" src={plusIcon} /> Add task
        </button>
        <CreateTask
          tasks={tasks}
          setTasks={setTasks}
          addTask={addTask}
          setAddTask={setAddTask}
        />
        <a
          href="https://google.com"
          className="show-task-completed"
          onClick={hundleShowCompleted}
        >
          {showCompleted ? "Hidden" : "Show completed"}
        </a>
        <div style={showCompleted ? { display: "block" } : { display: "none" }}>
          {tasksCompleted().map((task) => (
            <TaskCompleted todo={task} key={task.id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
