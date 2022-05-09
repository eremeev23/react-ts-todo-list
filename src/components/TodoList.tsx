import TodoListItem from "./TodoListItem";
import { useSelector } from "react-redux";
import { iTodo } from "../types/data";
import styled from "styled-components";

const List = styled.ul`
  width: 420px;
`

const TodoList: React.FC = () => {
  const todos: iTodo[] = useSelector((state:any):[] => state.todos);

  return (
    <List>
      {
        todos.map((todo) => {
          return <TodoListItem key={todo.id} {...todo}/>
        })
      }
    </List>
  );
}

export default TodoList;
