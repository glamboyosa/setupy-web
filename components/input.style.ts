import styled from 'styled-components';
export const CenterInputs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > * {
    margin-bottom: 2.5rem;
  }
`;
export const Input = styled.input`
  padding: 1rem 3rem;
  width: 50%;
  box-shadow: 0.5rem 1rem 1rem var(--black);
  font-size: 2rem;
  font-family: inherit;
`;
