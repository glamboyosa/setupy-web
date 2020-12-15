import styled from 'styled-components';
import LiftOff from '../assets/lift-off.gif';
export const Header = styled.header`
  height: 100vh;
  background-image: url(${LiftOff});
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  justify-content: center;
  align-items: center;
  & > * {
    margin-bottom: 2rem;
    color: var(--black);
  }
`;
export const PrimaryHeading = styled.h1`
  font-weight: bolder;
  font-size: 5rem;
  display: block;
`;
export const SecondaryHeading = styled.h2`
  font-size: 3rem;
`;
