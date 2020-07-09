import styled from "@emotion/styled";

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  max-height: 24px;
`;
const TasksContainer = styled.section`
  display: flex;
  flex-direction: column;
  color: #2d3748;
  max-width: 600px;
  margin: auto;
  margin-top: 100px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px #000000 solid;
  padding: 16px 0px;
`;

export { Logo };
