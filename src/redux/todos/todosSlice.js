import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () =>{
  const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
  return res.data
})
export const postTodosAsync = createAsyncThunk("todos/postTodosAsync", async (data) =>{
  const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
  return res.data
})

export const deleteTodosAsync = createAsyncThunk("todos/deleteTodosAsync", async (id) =>{
  await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
  return id
}
)
export const allDeleteTodosAsync = createAsyncThunk("todos/allDeleteTodosAsync", async (id) =>{
  await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
  return id
}
)
export const toggleTodosAsync = createAsyncThunk("todos/toggleTodosAsync", async ({id ,data}) =>{
  const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,data);
  return res.data
}
)
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    activeFilter: localStorage.getItem("activeFilter"),
    items: [],
    isLoading:false,
    error: null,
    addNewTodoLoading:false,
    addNewTodoError:null,
  },
  reducers: {
    changeFilter : (state,action) => {
      state.activeFilter = action.payload
    },
    // clearCompleted :(state) => {
    //   state.items = state.items.filter(todo => todo.completed!==true)
      
    // },
  },
  extraReducers:{
    //get todos
    [getTodosAsync.pending] : (state,action) => {
      state.isLoading =true
    },
    [getTodosAsync.fulfilled]: (state,action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected] : (state,action) => {
      state.isLoading = false;
      state.error= action.error.message;
    },
    // post Todos
    [postTodosAsync.pending]: (state, action) => {
      state.addNewTodoLoading=true;
    },
    [postTodosAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoLoading=false;
    },
    [postTodosAsync.rejected]: (state, action) => {
      state.addNewTodoError=action.error.message;
      state.addNewTodoLoading=false;
    },
    //delete
    [deleteTodosAsync.fulfilled]: (state,action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered
    },
    [allDeleteTodosAsync.fulfilled]: (state,action) => {
      console.log(action.payload);
      const newArray = []
      const filtered = newArray.push(action.payload)
      state.items = filtered
      
    },
    //toggle
    [toggleTodosAsync.fulfilled]: (state,action) => {
      const {id , completed}  = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed
    },
  }
});

export const selectItems = (state) => state.todos.items
export const {changeFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
