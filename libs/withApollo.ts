import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { withApollo } from 'next-apollo';
const link = createUploadLink({
  uri:
    process.env.NODE_ENV !== 'development'
      ? 'http://localhost:8000/graphql'
      : 'http://setupy-api.herokuapp.com/graphql',
});
const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV !== 'development'
      ? 'http://localhost:8000/graphql'
      : 'http://setupy-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default withApollo(apolloClient);
