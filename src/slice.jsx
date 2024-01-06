import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToTodo: (state, action) => {
      const newTodo = action.payload;
      return {
        ...state,
        todo: [...state.todo, newTodo],
      };
    },
    
    editTodo: (state, action) => { 
      const { id, text } = action.payload;
      const existingTodo = state.todo.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },
    removeTodo: (state, action) => {
      const id = action.payload;
      state.todo = state.todo.filter((todo) => todo.id !== id);
    },
    updateTodo: (state, action) => {
      const updatedTodo = action.payload;
      const updatedTodos = state.todo.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      );
    
      return {
        ...state,
        todo: updatedTodos,
      };
    },

  },
});

export const { addToTodo, editTodo, removeTodo, updateTodo} = todoSlice.actions;

export default todoSlice.reducer;
