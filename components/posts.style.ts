import styled from 'styled-components';
import { IoIosShareAlt, IoMdShare } from 'react-icons/io';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';
export const Page = styled.div`
  background-color: var(--white-shade);
  position: relative;
`;
export const UpButton = styled.div`
  margin-top: 1rem;
  width: 0;
  height: 0;
  border-left: 2rem solid transparent;
  border-right: 2rem solid transparent;
  cursor: pointer;
  border-bottom: 2rem solid
    ${(props) => (props.spellCheck ? '#360ccc' : '#878a8c')};
`;
export const RedditStyleUpVote = styled(GoArrowUp)`
  font-size: 2rem;
  color: var(--reddit-vote);
  cursor: pointer;
`;

export const RedditStyleDownVote = styled(GoArrowDown)`
  font-size: 2rem;
  color: var(--reddit-vote);
  cursor: pointer;
`;
export const DownButton = styled.div`
  width: 0;
  height: 0;
  border-left: 2rem solid transparent;
  border-right: 2rem solid transparent;
  cursor: pointer;
  border-top: 2rem solid ${(props) => (props.spellCheck ? '#f00' : '#878a8c')};
`;
export const CenterPosts = styled.div`
  display: flex;
  padding-top: 3rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > * {
    margin-bottom: 2rem;
  }
  @media only screen and (max-width: 800px) {
    & > * {
      margin-left: 1.3rem;
      margin-right: 1.3rem;
    }
  }
`;
export const Post = styled.div`
  display: flex;
  border-radius: 0.8rem;
  width: auto;
  flex-direction: column;
  max-width: 50rem;
  background-color: var(--white);
  box-shadow: 0.4rem 0.4rem 0.7rem var(--black);
`;
export const ShareButton = styled(IoIosShareAlt)`
  font-size: 2rem;
  color: var(--black);
`;
export const EitherSideofPost = styled.div`
  display: flex;
  background-color: var(--white);
  justify-content: space-around;
  margin-right: 3rem;
  align-items: center;

  & > * {
    margin-bottom: 1.5rem;
  }
`;
export const MarginTopImage = styled.div`
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
