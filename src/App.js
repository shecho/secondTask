import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import TodoCard from "./components/Card";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

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

  const deleteTask = (e) => {
    let taskId = parseInt(e.target.parentElement.id);
    let taskToDelete = todos.filter((todo) => todo.id === taskId);
    console.log(taskToDelete);
  };
  return (
    <div className="App">
      <Grid container justify={"center"} style={{ marginBottom: "20px" }}>
        <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
          New Task
        </Button>
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
