import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todoSlice"


export default configureStore({
  reducer: {
    todos: todosReducer
  }
})