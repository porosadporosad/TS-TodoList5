import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TodoType, changeTodo, deleteTodo, getTodos } from '../api/axios';

function TodoList({bool}: {bool: boolean}) {
  const { isLoading, isError, data:todo } = useQuery("todos", getTodos);
  const queryClient = useQueryClient();
	
	const deletemutation = useMutation(deleteTodo, {
	  onSuccess: () => {
	    queryClient.invalidateQueries("todos");
	  },
  });

  const changemutation = useMutation(changeTodo, {
	  onSuccess: () => {
	    queryClient.invalidateQueries("todos");
	  },
  });

  // 삭제
  const todoListDel = async (id: string) => {
    const delReal = window.confirm('정말 삭제하시겠습니까?');
    if (delReal) {
      deletemutation.mutate(id)
    } else {
      return;
    }
  };

  // 변경
  const todoListChange = async (todo:TodoType) => {
    changemutation.mutate(todo);
  };


  if(isLoading){
    return <div>로딩중..</div>
  }

  if(isError){
    return <div>에러!</div>
  }

  return (
    <TodoListMain>
      {bool ? 'Working..🔥' : 'Done..!🎉'}
      <TodoListFlex>
        {todo?.data
          .filter((item:TodoType) => {
            return item.isDone === bool;
          })
          .map((prev:TodoType) => {
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
