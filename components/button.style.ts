import styled from 'styled-components';
export const ButtonsParent = styled.div`
  position: relative;
  & > * {
    font-family: inherit;
    cursor: pointer;
  }
`;
export const SecondaryButton = styled.button`
  padding: 1rem 3rem;
  text-transform: uppercase;
  display: inline-block;
  color: var(--white);
  font-size: 1.5rem;
  background-color: #000;
  white-space: nowrap;
  border: none;
  position: absolute;
  transition: all 0.5s;
`;
export const PrimaryButton = styled.button`
  padding: 1rem 3rem;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--white);
  display: inline-block;
  font-size: 1.5rem;
  background-color: var(--int-blue);
  border: none;
  position: absolute;
  z-index: 3;
  top: -1rem;
  left: 0.7rem;
  transition: all 0.5s;
  &:hover {
    transform: translateY(17rem);
    transform: translateX(-3px);
    top: -0.5rem;
  }
`;
export const NavButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border: none;
  background-color: var(--int-blue);
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--white);
  border-radius: 8px;
  cursor: pointer;
`;
