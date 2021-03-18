import React from "react";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

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
    margin: "1rem auto 0 auto",
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[800],
    },
  },
}));
export default function AddTaskForm() {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <FormControl className={classes.formControl}>
          <Input placeholder="Type a new Task" />
          <Select id="task-select">
            <MenuItem value={true}>Completed</MenuItem>
            <MenuItem value={false}>Incompleted</MenuItem>
          </Select>
          <Fab
            className={classes.fabGreen}
            size="small"
            color="inherit"
            aria-label="add"
          >
            <SaveIcon />
          </Fab>
        </FormControl>
      </Card>
    </>
  );
}
