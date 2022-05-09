import { iTodo } from "../types/data"
import styled, {keyframes} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {CHECK_TODO, DELETE_TODO} from "../store/reducers/todoSlice";
import {useState} from "react";

interface iTodoItem extends iTodo {}

const fade = keyframes`
  from {
    height: 46px;
    opacity: 1;
  }
  
  to {
    height: 0;
    opacity: 0;
  }
`

const ListItem = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 10px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border: 3px solid #232323;
  
  &:before {
    box-sizing: border-box;
    position: absolute;
    content: '';
    left: 6px;
    top: 6px;
    width: 100%;
    height: 100%;
    border-right: 5px solid #232323;
    border-bottom: 5px solid #232323;
    z-index: -1;
    transition: left .2s ease-in-out, top .2s ease-in-out, border .2s ease-in-out;
  }
  
  &.checked {
    opacity: .6;
    
    &:after {
      position: absolute;
      content: '';
      left: -3%;
      top: 50%;
      transform: translateY(-50%);
      width: 106%;
      height: 2px;
      background-color: #232323;
      pointer-events: none;
    }
  }

  &.deleted, &.checked.deleted {
    overflow: hidden;
    animation: ${fade} .3s linear;
  }
`

const ItemTitle = styled.p`
  padding: 12px 0;
  line-height: 100%;
`

const ButtonsWrapper = styled.div`
`

const Button = styled.button`
  cursor: pointer;
  margin-right: -1px;
  margin-top: -.5px;
  height: calc(100% + 1.5px);
  width: 46px;
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  border-left: 3px solid #232323;
  transition: background-color .2s ease-in-out;

  &.button-check:hover {
    background-color: #2DD4BF;
  }

  &.button-delete:hover {
    background-color: #ff1164;
  }
`

const TodoListItem: React.FC<iTodoItem> = (todo) => {
  const { status } = todo;
  const dispatch = useDispatch();
  const [deleteStatus, setDeleteStatus] = useState(false)

  const checkTodo = (id: number) => dispatch(CHECK_TODO(id))
  const deleteTodo = (id: number) => {
    setDeleteStatus(true)
    setInterval(() => {
      dispatch(DELETE_TODO(id))
    }, 280)
  }

  return (
    <ListItem className={status ? "checked" : deleteStatus ? "deleted" : undefined}>
      <ItemTitle>
        {todo.title}
      </ItemTitle>

      <ButtonsWrapper>
        <Button
          className="button-check"
          onClick={() => checkTodo(todo.id)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>

        <Button
          className="button-delete"
          onClick={() => deleteTodo(todo.id)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </ButtonsWrapper>
    </ListItem>
  );
}

export default TodoListItem;
