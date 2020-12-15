import styled, { css } from 'styled-components';
export const Nav = styled.nav`
  display: grid;
  background-color: var(--white);
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  border-bottom: 1px solid var(--black);
  @media only screen and (max-width: 800px) {
    text-align: center;
    ${(props) =>
      props.spellCheck &&
      css`
        & {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          & > * {
            margin-bottom: 1.5rem;
          }
        }
      `}
  }
`;
export const Label = styled.label.attrs(() => ({
  for: 'checkbox',
}))`
  position: relative;
  opacity: 0;
  grid-column: -1;
  visibility: hidden;
  transition: all 0.2s;
  &,
  &::after,
  &::before {
    background-color: var(--black);
    width: 3rem;
    height: 3px;
    display: inline-block;
  }
  &::after,
  &::before {
    content: '';
    position: absolute;
    left: 0;
  }
  &::before {
    top: -1rem;
  }
  &::after {
    top: 1rem;
  }
  @media only screen and (max-width: 800px) {
    & {
      opacity: 1;
      visibility: visible;
      margin-top: -3rem;
    }
    ${(props) =>
      props.spellCheck &&
      css`
        & {
          position: absolute;
          top: 5rem;
          right: 1rem;
        }
      `}
  }
`;
export const Input = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  display: none;
`;
export const NavItems = styled.div`
  grid-column: 5/13;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 1rem;
  }
  @media only screen and (max-width: 800px) {
    & > * {
      display: none;
    }
    ${(props) =>
      props.spellCheck &&
      css`
        & > * {
          display: block;
          margin-bottom: 1rem;
        }
        & {
          flex-direction: column;
        }
      `}
  }
`;
