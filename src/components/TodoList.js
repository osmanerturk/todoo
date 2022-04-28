
import {React , useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {toggleTodosAsync,selectItems , getTodosAsync ,deleteTodosAsync} from "../redux/todos/todosSlice"
function TodoList() {
  
  let items= useSelector(selectItems)
  const activeFilter= useSelector(state => state.todos.activeFilter)
  const dispatch=useDispatch()

  const isLoading = useSelector(state => state.todos.isLoading)
  const error = useSelector(state=>state.todos.error)
  

  useEffect(()=>{
    dispatch(getTodosAsync())
  },[dispatch])


  const handleChange= (id , completed)=>{
   dispatch(toggleTodosAsync({id , data :{completed}}))
  }
  
  if(activeFilter !== "all" ) {
    items = items.filter(todo=> 
      activeFilter === "active" ? !todo.completed
      : todo.completed)
  }

  const handleDestroy= (id)=>{
  dispatch(deleteTodosAsync(id))
  }

  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div>{error}</div>
  }

  return (
    <ul className="todo-list">  
        {
          items.map(item =>  
          <li key={item.id} className={item.completed ?  "completed" : ""}>
          <div className="view" >
            <input className="toggle" type="checkbox" 
            checked={item.completed} 
            onChange={()=>handleChange(item.id, !item.completed)} />
            <label>{item.title}</label>
            <button 
            className="destroy" 
            onClick={()=>handleDestroy(item.id)} ></button>
          </div>
        </li>)
        }
      </ul>
      
  )
}

export default TodoList