import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TodoType = {
  id: string;
  isDone: boolean;
  title: string;
  content: string;
};

interface TodoState {
    todo:TodoType[]
  };

const initialState: TodoState  = {
  todo: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add_todos: (state, action:PayloadAction<TodoType>) => {
      state.todo = [...state.todo, action.payload];
    },
    change_todos: (state, action: PayloadAction<string>) => {
      const findIndex = state.todo.findIndex((prev) => prev.id === action.payload);
      const newTodo = [...state.todo];
      newTodo[findIndex].isDone = !newTodo[findIndex].isDone;
      state.todo = newTodo;
    },
    delete_todos: (state, action: PayloadAction<string>) => {
      state.todo = state.todo.filter((prev) => prev.id !== action.payload);
    },
    set_todos: (state, action) => {
      state.todo = action.payload;
    }
  }
});

export default todosSlice.reducer;
export const { add_todos, change_todos, delete_todos, set_todos } = todosSlice.actions;