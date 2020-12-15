import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { withApollo } from 'next-apollo';
const link = createUploadLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/graphql'
      : 'https://setupy-api.heroku.app/graphql',
});
const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/graphql'
      : 'https://setupy-api.vercel.app/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default withApollo(apolloClient);
