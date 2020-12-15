import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  Me?: Maybe<UserResponse>;
  GetPostById: PostsResponse;
  GetPosts: PostsResponse;
  GetPostsByUser: PostsResponse;
};


export type QueryGetPostByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetPostsByUserArgs = {
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Error>;
  user?: Maybe<User>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  error?: Maybe<Error>;
  posts?: Maybe<Array<Posts>>;
  post?: Maybe<Posts>;
};

export type Posts = {
  __typename?: 'Posts';
  id: Scalars['Int'];
  description: Scalars['String'];
  photoPath: Scalars['String'];
  username: Scalars['String'];
  votes: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Register?: Maybe<Scalars['Boolean']>;
  Login: UserResponse;
  Logout: Scalars['Boolean'];
  ForgotPassword?: Maybe<Scalars['Boolean']>;
  ChangePassword?: Maybe<Scalars['Boolean']>;
  CreatePosts: PostsResponse;
  VotePost?: Maybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  UserInput: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostsArgs = {
  username: Scalars['String'];
  description: Scalars['String'];
  picture: Scalars['String'];
};


export type MutationVotePostArgs = {
  type: Scalars['String'];
  id: Scalars['Float'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type PostFragment = (
  { __typename?: 'Posts' }
  & Pick<Posts, 'id' | 'description' | 'photoPath' | 'votes' | 'username'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'ChangePassword'>
);

export type CreatePostMutationVariables = Exact<{
  picture: Scalars['String'];
  description: Scalars['String'];
  username: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { CreatePosts: (
    { __typename?: 'PostsResponse' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message'>
    )>, post?: Maybe<(
      { __typename?: 'Posts' }
      & PostFragment
    )> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'ForgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { Login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'Logout'>
);

export type VotePostMutationVariables = Exact<{
  id: Scalars['Float'];
  type: Scalars['String'];
}>;


export type VotePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'VotePost'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'Register'>
);

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetPostByIdQuery = (
  { __typename?: 'Query' }
  & { GetPostById: (
    { __typename?: 'PostsResponse' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message'>
    )>, post?: Maybe<(
      { __typename?: 'Posts' }
      & PostFragment
    )> }
  ) }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { GetPosts: (
    { __typename?: 'PostsResponse' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message'>
    )>, posts?: Maybe<Array<(
      { __typename?: 'Posts' }
      & PostFragment
    )>> }
  ) }
);

export type GetPostsByUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetPostsByUserQuery = (
  { __typename?: 'Query' }
  & { GetPostsByUser: (
    { __typename?: 'PostsResponse' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message'>
    )>, posts?: Maybe<Array<(
      { __typename?: 'Posts' }
      & PostFragment
    )>> }
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { Me?: Maybe<(
    { __typename?: 'UserResponse' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username'>
    )> }
  )> }
);

export const PostFragmentDoc = gql`
    fragment Post on Posts {
  id
  description
  photoPath
  votes
  username
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  ChangePassword(token: $token, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($picture: String!, $description: String!, $username: String!) {
  CreatePosts(picture: $picture, description: $description, username: $username) {
    error {
      message
    }
    post {
      ...Post
    }
  }
}
    ${PostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *      description: // value for 'description'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  ForgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  Login(email: $email, password: $password) {
    user {
      id
      email
      username
    }
    error {
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  Logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const VotePostDocument = gql`
    mutation VotePost($id: Float!, $type: String!) {
  VotePost(id: $id, type: $type)
}
    `;
export type VotePostMutationFn = Apollo.MutationFunction<VotePostMutation, VotePostMutationVariables>;

/**
 * __useVotePostMutation__
 *
 * To run a mutation, you first call `useVotePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVotePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [votePostMutation, { data, loading, error }] = useVotePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useVotePostMutation(baseOptions?: Apollo.MutationHookOptions<VotePostMutation, VotePostMutationVariables>) {
        return Apollo.useMutation<VotePostMutation, VotePostMutationVariables>(VotePostDocument, baseOptions);
      }
export type VotePostMutationHookResult = ReturnType<typeof useVotePostMutation>;
export type VotePostMutationResult = Apollo.MutationResult<VotePostMutation>;
export type VotePostMutationOptions = Apollo.BaseMutationOptions<VotePostMutation, VotePostMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  Register(UserInput: {email: $email, password: $password, username: $username})
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($id: Float!) {
  GetPostById(id: $id) {
    error {
      message
    }
    post {
      ...Post
    }
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, baseOptions);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, baseOptions);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  GetPosts {
    error {
      message
    }
    posts {
      ...Post
    }
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostsByUserDocument = gql`
    query GetPostsByUser($username: String!) {
  GetPostsByUser(username: $username) {
    error {
      message
    }
    posts {
      ...Post
    }
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostsByUserQuery__
 *
 * To run a query within a React component, call `useGetPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetPostsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>) {
        return Apollo.useQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GetPostsByUserDocument, baseOptions);
      }
export function useGetPostsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>) {
          return Apollo.useLazyQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GetPostsByUserDocument, baseOptions);
        }
export type GetPostsByUserQueryHookResult = ReturnType<typeof useGetPostsByUserQuery>;
export type GetPostsByUserLazyQueryHookResult = ReturnType<typeof useGetPostsByUserLazyQuery>;
export type GetPostsByUserQueryResult = Apollo.QueryResult<GetPostsByUserQuery, GetPostsByUserQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  Me {
    error {
      message
    }
    user {
      id
      email
      username
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;