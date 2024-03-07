import { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export type TodoType = {
  id: string;
  isDone: boolean;
  title: string;
  content: string;
};

function Main() {
  const [todo, setTodo] = useState<TodoType[]>([]);
  return (
    <>
      <TodoInput setTodo={setTodo} />
      <TodoList todo={todo} setTodo={setTodo} bool={false} />
      <TodoList todo={todo} setTodo={setTodo} bool={true} />
    </>
  );
}

export default Main;
