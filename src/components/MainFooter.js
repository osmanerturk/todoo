import {React , useEffect} from "react";
import {useSelector , useDispatch} from "react-redux"
import {changeFilter ,selectItems ,allDeleteTodosAsync} from "../redux/todos/todosSlice"
function MainFooter() {
  const dispatch = useDispatch()
  const items= useSelector(selectItems)
  const activeFilter= useSelector(state => state.todos.activeFilter)
  const leftTodos = items.filter(item =>!item.completed)

  useEffect(() =>{
    localStorage.setItem("activeFilter" , activeFilter)
  },[activeFilter])

 const handleAllClear = async(id)=> {
 await dispatch(activeFilter === "completed" && allDeleteTodosAsync(id))
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{leftTodos.length} </strong> 
        {leftTodos.length === 0 || leftTodos.length === 1 ? "item left" : "items left"}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" 
          className={activeFilter === "all" ? "selected" : ""} 
          onClick={()=>dispatch(changeFilter("all"))}  >All</a>
        </li>
        <li>
          <a href="#/" className={activeFilter === "active" ? "selected" : ""}
           onClick={()=>dispatch(changeFilter("active"))}
          >Active</a>
        </li>
        <li>
          <a href="#/" className={activeFilter === "completed" ? "selected" : ""}
           onClick={()=>dispatch(changeFilter("completed"))}
          >Completed</a>
        </li>
      </ul>

      <button className="clear-completed" onClick={()=> handleAllClear(leftTodos)} >Clear completed</button>
    </footer>
  );
}

export default MainFooter;
