import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        description: action.payload.description,
        completed: false,
        important: action.payload.important || false,
        creationDate: action.payload.creationDate || new Date().toISOString().split('T')[0],
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    toggleImportant: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.important = !todo.important;
      }
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTodo: (state, action) => {
      const { id, newText, newDescription, newCreationDate } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
        todo.description = newDescription;
        todo.creationDate = newCreationDate;
      }
    },
  },
});

export const { addTodo, toggleComplete, toggleImportant, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
