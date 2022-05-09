import './styles/_vars.scss';
import './styles/_global.scss';
import InputBlock from "./components/InputBlock"
import TodoList from "./components/TodoList"
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  padding: 140px 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 40px;
  color: #2DD4BF;
`

const App: React.FC = () => {

  return (
    <Container className="app">
      <Title>
        T0D0 LIST
      </Title>
      <InputBlock />
      <TodoList />

    </Container>
  );
}

export default App;
