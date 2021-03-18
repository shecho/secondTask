import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "280px",
  },
});
const TodosCard = (props) => {
  const { userId, id, title, completed } = props.todo;
  const stylesColor = () => {
    return {
      textDecoration: completed ? "line-through" : "none",
    };
  };
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography align="center" variant="h6" component="h2">
            Task Number:{id}
          </Typography>
          <Typography align="center" variant="h6">
            UserID: {userId}
          </Typography>

          <Typography
            align="center"
            variant="h5"
            style={stylesColor()}
            color={completed ? "textSecondary" : "textPrimary"}
          >
            {title}
          </Typography>
        </CardContent>
        <CardContent>
          <Button
            id={id}
            onClick={(e) => props.deleteTask(e)}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodosCard;
