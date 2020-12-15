import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavButton } from '../../components/button.style';
import {
  PrimaryHeading,
  SecondaryHeading,
} from '../../components/header.style';
import { LinkToPages } from '../../components/links.style';
import { Input, Label, Nav, NavItems } from '../../components/nav.style';
import {
  CenterPosts,
  EitherSideofPost,
  Image,
  MarginTopImage,
  Page,
  Post,
} from '../../components/posts.style';
import {
  useGetPostsQuery,
  useLogoutMutation,
  useMeQuery,
  useVotePostMutation,
} from '../../generated/graphql';
import { Context } from '../../libs/userProvider';
import withApollo from '../../libs/withApollo';
const Posts = () => {
  const [spellCheckk, setSpellCheck] = useState(false);
  const [upvoteColor, setUpvoteColor] = useState(false);
  const [downvoteColor, setDownvoteColor] = useState(false);
  const [webShareError, setWebShareError] = useState<string | null>(null);
  const [logoutMutation, { data: logoutData, loading }] = useLogoutMutation();
  const { data, refetch, error } = useGetPostsQuery({
    fetchPolicy: 'cache-and-network',
  });
  const { data: meData } = useMeQuery({ fetchPolicy: 'cache-and-network' });
  const router = useRouter();
  const { user, setUserHandler } = useContext(Context);
  const [
    postMutation,
    { data: voteData, loading: voteLoading },
  ] = useVotePostMutation();
  useEffect(() => {
    if (voteData?.VotePost) {
      refetch();
      notify('successful. how about sharing the post ? 😉', 'success');
    }
  }, [voteData]);
  const logoutHandler = () => {
    logoutMutation();
  };
  const webShareHandler = async (id: number, username: string) => {
    try {
      await navigator.share({
        title: 'Setupy - Posts🔥',
        text: 'Check out this sweet setup',
        url: `https://setupy.vercel.app/posts/${username}/${id}`,
      });
    } catch (e) {
      setWebShareError("Oops. Sharing isn't supported in your browser");
    }
  };
  const votesHandler = (id: number, type: 'upvote' | 'downvote') => {
    if (type === 'upvote') {
      setUpvoteColor(!upvoteColor);
      setDownvoteColor(false);

      postMutation({ variables: { id, type } });
    } else if (type === 'downvote') {
      setDownvoteColor(!downvoteColor);
      setUpvoteColor(false);

      postMutation({ variables: { id, type } });
    }
  };
  if (meData?.Me?.user) {
    setUserHandler(meData.Me.user);
  }
  if (logoutData?.Logout) {
    setUserHandler(null);
  }
  if (data?.GetPosts.error) {
    return (
      <Page>
        <CenterPosts>
          <SecondaryHeading>
            looks like no one's posted anything yet.
          </SecondaryHeading>
          <Link href='/uploads'>
            <LinkToPages>Be the first to upload</LinkToPages>
          </Link>
        </CenterPosts>
      </Page>
    );
  }

  const notify = (message: string, type: 'success' | 'error') =>
    toast(message, {
      position: 'top-center',
      type,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  if (webShareError) {
    notify(webShareError, 'error');
    setWebShareError(null);
  }
  if (voteData?.VotePost === null) {
    notify('there was a problem voting please try again', 'error');
  }

  return (
    <>
      <Head>
        <title>Setupy - Posts🔥</title>
      </Head>
      <NextSeo
        title='Setupy - Posts🔥'
        openGraph={{
          url:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/posts'
              : 'https://setupy.vercel.app/posts',
          title: 'Setupy - Posts🔥',
          images: [
            {
              url:
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=752&q=80',
            },
          ],
        }}
        twitter={{ cardType: 'summary_large_image' }}
      />
      <ToastContainer
        position='top-center'
        style={{ fontSize: '2rem', fontFamily: 'inherit' }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Page>
        <Nav spellCheck={spellCheckk}>
          <Link href='/'>
            <SecondaryHeading style={{ whiteSpace: 'nowrap' }}>
              Setupy🔥
            </SecondaryHeading>
          </Link>
          <Input
            checked={spellCheckk}
            onChange={() => setSpellCheck(!spellCheckk)}
            id='checkbox'
          />
          <NavItems spellCheck={spellCheckk}>
            {user && (
              <img src='/user-image-with-black-background.svg' width='7%' />
            )}
            {!user ? (
              <NavButton onClick={() => router.push('/login')}>Login</NavButton>
            ) : (
              <NavButton disabled={loading} onClick={logoutHandler}>
                Logout
              </NavButton>
            )}
            <NavButton onClick={() => router.push('/uploads')}>
              Upload
            </NavButton>
          </NavItems>
          <Label htmlFor='checkbox' spellCheck={spellCheckk} />
        </Nav>
        <CenterPosts>
          <PrimaryHeading>See the hottest posts 🔥</PrimaryHeading>
        </CenterPosts>
        <CenterPosts>
          {data && !loading ? (
            data!.GetPosts!.posts!.map((el) => (
              <Post key={el.id}>
                <EitherSideofPost>
                  {/* <UpButton
                    aria-disabled={voteLoading}
                    onClick={() => votesHandler(el.id, 'upvote')}
                    spellCheck={upvoteColor}
                  />
                  <div style={{ fontSize: '1.5rem' }}>{el.votes}</div>
                  <DownButton
                    aria-disabled={voteLoading}
                    onClick={() => votesHandler(el.id, 'downvote')}
                    spellCheck={downvoteColor}
                  /> */}
                  <NavButton
                    onClick={() => webShareHandler(el.id, el.username)}
                  >
                    Share Post
                  </NavButton>
                </EitherSideofPost>
                <EitherSideofPost>
                  <MarginTopImage>
                    <Image src={el.photoPath} width='auto' height='auto' />
                  </MarginTopImage>
                  <SecondaryHeading>{el.description}</SecondaryHeading>
                  <Link href={`/posts/${el.username}`}>
                    <LinkToPages>post by {el.username}</LinkToPages>
                  </Link>
                </EitherSideofPost>
              </Post>
            ))
          ) : (
            <CenterPosts></CenterPosts>
          )}
        </CenterPosts>
      </Page>
    </>
  );
};

export default withApollo({ ssr: true })(Posts);
