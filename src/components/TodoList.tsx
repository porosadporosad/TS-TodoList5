import React from 'react';
import { TodoType } from './Main';
import styled from 'styled-components';

function TodoList({
  todo,
  setTodo,
  bool
}: {
  todo: TodoType[];
  setTodo: React.Dispatch<React.SetStateAction<TodoType[]>>;
  bool: boolean;
}) {
  // 삭제
  const todoListDel = (id: string) => {
    const newTodos = todo.filter((prev) => prev.id !== id);
    const delReal = window.confirm('정말 삭제하시겠습니까?');
    if (delReal) {
      setTodo(newTodos);
    } else {
      return;
    }
  };

  // 변경
  const todoListChange = (nowTodo: TodoType) => {
    const findIndex = todo.findIndex((prev) => prev.id === nowTodo.id);
    const copiedItems = [...todo];
    copiedItems[findIndex].isDone = !copiedItems[findIndex].isDone;
    setTodo(copiedItems);
  };

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
                  <TodoListBtn onClick={() => todoListChange(prev)}>{bool ? '완료' : '취소'}</TodoListBtn>
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
