import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { add_todos } from '../redux/modules/todos';
import { useAppDispatch } from '../hooks';

function TodoInput() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const dispatch = useAppDispatch();

  const todoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const todoContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const todoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      title,
      content,
      id: uuidv4(),
      isDone: false
    };
    dispatch(add_todos(newTodo));
    setTitle('');
    setContent('');
  };

  return (
    <TodoInputMain>
      <TodoInputForm onSubmit={todoSubmit}>
        <div>
          제목 <TodoInputStyle value={title} onChange={todoTitle} maxLength={10} required />
          내용 <TodoInputStyle value={content} onChange={todoContent} maxLength={20} required />
        </div>
        <TodoInputBtn type="submit">추가하기</TodoInputBtn>
      </TodoInputForm>
    </TodoInputMain>
  );
}

export default TodoInput;

const TodoInputMain = styled.div`
  margin: 0 25px 0 10px;
  padding: 40px;
  background-color: #f5f4f1;
  border-radius: 15px;
  font-weight: bold;
`;

const TodoInputForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const TodoInputStyle = styled.input`
  border-radius: 10px;
  border: 0;
  width: 270px;
  height: 35px;
  margin: 10px;
`;

const TodoInputBtn = styled.button`
  background-color: #00829b;
  color: white;
  width: 150px;
  height: 35px;
  border-radius: 10px;
  border: 0;
  cursor: pointer;
  margin: 10px;
`;
