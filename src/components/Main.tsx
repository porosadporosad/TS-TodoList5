import TodoInput from './TodoInput';
import TodoList from './TodoList';



function Main() {
  return (
    <>
      <TodoInput />
      <TodoList bool={false} />
      <TodoList bool={true} />
    </>
  );
}

export default Main;
