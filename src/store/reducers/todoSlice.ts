import {createSlice} from "@reduxjs/toolkit";
import { iTodo } from "../../types/data"

const initialState: iTodo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    ADD_TODO: (state, action:any) => {
      state.push(action.payload)
    },

    CHECK_TODO: (state, action) => {
      state.forEach(item => item.id === action.payload ? item.status = !item.status : null)
    },

    DELETE_TODO: (state, action) => {
      state.forEach((item, i) => item.id === action.payload ? state.splice(i, 1) : null)
    }
  }
})

export const { ADD_TODO, CHECK_TODO, DELETE_TODO } = todoSlice.actions;

export default todoSlice.reducer