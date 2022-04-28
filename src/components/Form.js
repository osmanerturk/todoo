import React from "react";
import { useDispatch ,useSelector  } from "react-redux";
import { postTodosAsync } from "../redux/todos/todosSlice";
function Form() {
  const [title, setTitle] = React.useState("");
  const isLoading = useSelector(state=> state.todos.addNewTodoLoading)
  const errorLoading = useSelector(state=> state.todos.addNewTodoError)
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    dispatch(postTodosAsync({ title }));

    setTitle("");
  };

  if(errorLoading) {
    return <div>{errorLoading}</div>
  }

  if(isLoading) {
    return <div>"Loading..."</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="new-todo"
        placeholder="what needs to be done?"
        autoFocus
      />
    </form>
  );
}

export default Form;
