import {useState} from "react";
import { iTodo } from "../types/data"
import {useDispatch} from "react-redux";
import {ADD_TODO} from "../store/reducers/todoSlice"
import styled, {keyframes} from "styled-components";

const shake = keyframes`
  0% {
    left: 0;
  }

  20% {
    left: -5px;
  }

  40% {
    left: 5px;
  }

  60% {
    left: -5px;
  }

  80% {
    left: 5px;
  }

  100% {
    left: 0;
  }
`

const Form = styled.form`
  position: relative;
  margin: 40px 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  outline: none;
  margin-right: 15px;
  width: 340px;
  padding: 10px 0 5px;
  color: #232323;
  font-weight: 500;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid #232323;

  &:focus, &:valid {
    border-bottom-color: #2DD4BF;
  }
  
  &:focus + label, &:valid + label {
    top: -1px;
    color: #2DD4BF;
    font-size: 10px;
  }
`

const Label = styled.label`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #a3a3a3;
  pointer-events: none;
  font-size: 15px;
  transition: top .2s ease-in-out, font-size .2s ease-in-out;
`

const Submit = styled.button`
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  padding: 10px 15px;
  background-color: #2DD4BF;
  color: #232323;
  font-size: 15px;
  font-weight: 600;
  border: 2px solid #232323;
  border-radius: 0;
  transition: transform .2s ease-in-out;
  
  &:before {
    box-sizing: border-box;
    position: absolute;
    content: '';
    left: 5px;
    top: 5px;
    width: 100%;
    height: 100%;
    border-right: 4px solid #232323;
    border-bottom: 4px solid #232323;
    z-index: -1;
    transition: left .2s ease-in-out, top .2s ease-in-out, border .2s ease-in-out;
  }
  
  &:hover {
    transform: translateY(2px) translateX(2px);
    z-index: 10;
    
    &:before {
      left: 2px;
      top: 2px;
      border-right: 1px solid #232323;
      border-bottom: 1px solid #232323;
    }
  }
`

const ErrorText = styled.p`
  position: absolute;
  bottom: -16px;
  font-size: 12px;
  font-weight: 600;
  color: #232323;
  animation: ${shake} .5s linear;
`

const InputBlock: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const addTodo = (todo: iTodo) => dispatch(ADD_TODO(todo));

  const todoHandler = (e:any) => {
    e.preventDefault();

    if (title) {
      addTodo({
        id: Date.now(),
        title,
        status: false
      })

      setTitle('')
    } else {
      setError(true)
    }
  }

  const showError = () => {
    if (error) {
      return <ErrorText>type your todo</ErrorText>
    } else {
      return null
    }
  }

  return (
    <Form
      onSubmit={e => todoHandler(e)}
      className={error ? "todo-form error" : "todo-form"}
      noValidate={true}
    >
      <InputWrapper>
        <Input
          type="text"
          value={title}
          id="todo_input"
          className="todo-form__input"
          onChange={e => setTitle(e.target.value)}
          onFocus={() => setError(false)}
          required={true}
        />
        <Label htmlFor="todo_input">
          Your todo
        </Label>
        { showError() }
      </InputWrapper>

      <Submit type="submit">
        Add
      </Submit>
    </Form>
  );
}

export default InputBlock;
