import { Votes } from '../generated/graphql';

export const aggregatePosts = (votes: Pick<Votes, 'id' | 'type'>[]) => {
  if (votes.length < 1) {
    return 0;
  }
  return (
    votes.filter((el) => el.type === 'upvote').length -
    votes.filter((el) => el.type === 'downvote').length
  );
};
