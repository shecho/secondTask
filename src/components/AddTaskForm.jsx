import React, { useRef } from "react";
import SaveIcon from "@material-ui/icons/Save";
import { green } from "@material-ui/core/colors";
import {
  Input,
  Card,
  NativeSelect,
  FormControl,
  Fab,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  fabGreen: {
    margin: ".5rem  0 ",
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[800],
    },
    input: {
      display: "none",
    },
  },
}));
export default function AddTaskForm(props) {
  const { addTask, handleInput } = props;
  const classes = useStyles();
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.firstElementChild.value = "";
  };
  return (
    <>
      <form onInput={(e) => handleInput(e)} onSubmit={(e) => addTask(e)}>
        <Card className={classes.root}>
          <FormControl className={classes.formControl}>
            <Input
              ref={inputRef}
              type="text"
              name="title"
              placeholder="Type a new Task here"
            />
          </FormControl>
          <NativeSelect name="completed">
            <option value={true}></option>
            <option value={true}>Completed</option>
            <option value={false}>Incompleted</option>
          </NativeSelect>

          <input
            style={{ display: "none" }}
            id="icon-button-file"
            type="submit"
          />
          <label htmlFor="icon-button-file">
            <Fab
              onClick={() => handleClick()}
              className={classes.fabGreen}
              size="small"
              coloaria-label="upload picture"
              component="span"
              r="inherit"
              aria-label="add"
            >
              <SaveIcon />
            </Fab>
          </label>
        </Card>
      </form>
    </>
  );
}
