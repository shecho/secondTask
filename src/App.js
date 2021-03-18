import React, { useState, useEffect } from "react";
import "./App.css";
import TodoCard from "./components/Card";
import AddTaskForm from "./components/AddTaskForm";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    let url = "https://jsonplaceholder.typicode.com/users/1/todos";
    let response = await fetch(url);
    let res = await response.json();
    setTodos(() => res);
  };
  const addTask = (e) => {
    console.log(e);
  };
  const deleteTask = (e) => {
    let taskId = parseInt(e.target.parentElement.id);
    let newTodoList = todos.filter((todo) => todo.id !== taskId);
    setTodos(() => newTodoList);
  };
  return (
    <div className="App">
      <Grid container justify={"center"} style={{ marginBottom: "20px" }}>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={(e) => addTask(e)} />
        </Fab>
        <AddTaskForm />
      </Grid>
      <Grid container spacing={4} justify={"center"}>
        {todos.map((todo) => {
          return (
            <Grid key={todo.id} item xs={12} sm={10} md={6} lg={4}>
              <TodoCard todo={todo} deleteTask={deleteTask} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
