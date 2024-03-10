import axios, { AxiosResponse } from "axios";

export type TodoType = {
    id: string;
    isDone: boolean;
    title: string;
    content: string;
  };



const getTodos = async ():Promise<AxiosResponse<TodoType[]>> => {
    const response = await axios.get("http://localhost:3001/todos");
    return response;
  };

const addTodo = async (newTodo:TodoType) => {
    await axios.post("http://localhost:3001/todos", newTodo);
  };

const deleteTodo = async(id:string)=> {
    await axios.delete(`http://localhost:3001/todos/${id}` )
}

const changeTodo = async(todo:TodoType) => {
    await axios.patch(`http://localhost:3001/todos/${todo.id}`, {isDone: !todo.isDone})
}
  
  export { getTodos, addTodo,deleteTodo,changeTodo };