import { Dispatch, SetStateAction } from "react";
import { Place } from "../model/place";
import { Todo } from "../model/todo";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoItem = (props: {
  id: number;
  text: string;
  done: boolean;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  place?: Place;
}) => {
  const toggleTodoItem = (existingTodos: readonly Todo[]): Todo[] => {
    let todos = [...existingTodos];
    todos.find((t, i) => {
      if (t.id === props.id) {
        todos[i] = { ...t, done: !t.done };
      }
    });
    return todos;
  };

  const deleteTodoItem = (existingTodos: readonly Todo[]): Todo[] => {
    let todos = [...existingTodos];
    return todos.filter((t) => t.id !== props.id);
  };

  const placeToString = (place: Place): string => {
    if (place === "home") {
      return "🏠 Home";
    } else {
      return "💼 Work";
    }
  };

  return (
    <div>
      <Checkbox
        checked={props.done}
        onChange={() =>
          props.setTodos((existingTodos) => toggleTodoItem(existingTodos))
        }
      />
      <span style={{ textDecoration: props.done ? "line-through" : "none" }}>
        {props.text}
      </span>
      {props.place && (
        <Chip
          size="small"
          label={props.place ? placeToString(props.place) : ""}
        />
      )}
      <IconButton
        aria-label="Delete"
        component="span"
        onClick={() =>
          props.setTodos((existingTodos) => deleteTodoItem(existingTodos))
        }
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TodoItem;
