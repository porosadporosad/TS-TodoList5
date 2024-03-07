import styled from 'styled-components';
import { change_todos, delete_todos, set_todos } from '../redux/modules/todos';
import { useAppDispatch, useAppSelector } from '../hooks';
import axios from 'axios';
import { useEffect } from 'react';

function TodoList({bool}: {bool: boolean}) {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todos.todo);

  // 삭제
  const todoListDel = async (id: string) => {
    const delReal = window.confirm('정말 삭제하시겠습니까?');
    if (delReal) {
      await axios.delete(`http://localhost:3001/todos/${id}` )
      dispatch(delete_todos(id))
    } else {
      return;
    }
  };

  // 변경
  const todoListChange = async (id: string, isDone: boolean) => {
    await axios.patch(`http://localhost:3001/todos/${id}`, {isDone: !isDone})
    dispatch(change_todos(id))
  };

  useEffect(() => {
    const dbDate = async() => {
      const { data } = await axios.get("http://localhost:3001/todos");
      dispatch(set_todos(data))
    }
    dbDate()
  },[])

  return (
    <TodoListMain>
      {bool ? 'Working..🔥' : 'Done..!🎉'}
      <TodoListFlex>
        {todo
          .filter((item) => {
            return item.isDone === bool;
          })
          .map((prev) => {
            return (
              <TodoListCard key={prev.id}>
                <TodoListText>
                  <TodoListTitie>{prev.title}</TodoListTitie>
                  <TodoListContent>{prev.content}</TodoListContent>
                </TodoListText>
                <TodoListBtns>
                  <TodoListDelBtn onClick={() => todoListDel(prev.id)}>삭제하기</TodoListDelBtn>
                  <TodoListBtn onClick={() => todoListChange(prev.id, prev.isDone)}>{bool ? '완료' : '취소'}</TodoListBtn>
                </TodoListBtns>
              </TodoListCard>
            );
          })}
      </TodoListFlex>
    </TodoListMain>
  );
}

export default TodoList;

const TodoListMain = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin: 30px;
`;

const TodoListFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const TodoListCard = styled.div`
  border: 3px solid #00829b;
  border-radius: 10px;
  width: 400px;
  margin: 5px;
  font-size: 20px;
  font-weight: normal;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const TodoListTitie = styled.div`
  margin-left: 15px;
  font-size: 30px;
  padding: 10px;
`;

const TodoListContent = styled.div`
  margin-left: 20px;
  padding: 10px;
`;

const TodoListBtn = styled.button`
  border: 2px solid green;
  border-radius: 10px;
  background-color: white;
  width: 170px;
  height: 40px;
  cursor: pointer;
  margin: 10px;
`;

const TodoListDelBtn = styled.button`
  border: 2px solid red;
  border-radius: 10px;
  background-color: white;
  width: 170px;
  height: 40px;
  cursor: pointer;
  margin: 10px;
`;

const TodoListText = styled.div`
  display: flex;
  flex-direction: column;
`;

const TodoListBtns = styled.div`
  display: flex;
`;
