import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
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
  RedditStyleDownVote,
  RedditStyleUpVote,
  ShareButton,
} from '../../components/posts.style';
import SVG from '../../components/svg';
import {
  useCreateVotesMutation,
  useGetPostsQuery,
  useLogoutMutation,
  useMeQuery,
} from '../../generated/graphql';
import { aggregatePosts } from '../../libs/aggregateVotes';
import useDetectDevice from '../../libs/useDetectDevice';
import { Context } from '../../libs/userProvider';
import withApollo from '../../libs/withApollo';
const Posts = () => {
  const [spellCheckk, setSpellCheck] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [webShareError, setWebShareError] = useState<string | null>(null);
  const [logoutMutation, { data: logoutData, loading }] = useLogoutMutation();
  const { data, refetch, error } = useGetPostsQuery({
    fetchPolicy: 'cache-and-network',
  });
  const { data: meData } = useMeQuery({ fetchPolicy: 'cache-and-network' });
  const router = useRouter();
  const { user, setUserHandler } = useContext(Context);
  const [
    voteMutation,
    { data: voteData, loading: voteLoading },
  ] = useCreateVotesMutation();
  const { isDesktop } = useDetectDevice();
  useEffect(() => {
    if (voteData?.CreateVotes) {
      refetch();
      notify('successful. how about sharing the post ? 😉', 'success');
    }
  }, [voteData]);
  const logoutHandler = () => {
    logoutMutation();
  };
  const webShareHandler = async (id: number, username: string) => {
    try {
      if (isDesktop) {
        window.location = (`https://twitter.com/share?url=https://setupy-web.vercel.app/posts/${username}/${id}&text=Check out this hot post by ${username}` as unknown) as Location;
      }
      await navigator.share({
        title: 'Setupy - Posts🔥',
        text: 'Check out this sweet setup',
        url: `https://setupy-web.vercel.app/posts/${username}/${id}`,
      });
    } catch (e) {
      setWebShareError("Oops. Sharing isn't supported in your browser");
    }
  };
  const votesHandler = (id: number, vote: 'upvote' | 'downvote') => {
    voteMutation({ variables: { postsId: id, type: vote } });
  };
  if (meData?.Me?.user) {
    setUserHandler(meData.Me.user);
  }
  if (logoutData?.Logout) {
    setUserHandler(null);
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
  if (voteData?.CreateVotes === null) {
    notify('there was a problem voting please try again', 'error');
  }
  if (error) {
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
              : 'https://setupy-web.vercel.app/posts',
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
            <SecondaryHeading
              style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
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
        {data?.GetPosts?.error && (
          <CenterPosts>
            <SecondaryHeading>
              looks like no one's posted anything yet.
            </SecondaryHeading>
            <Link href='/uploads'>
              <LinkToPages>Be the first to upload</LinkToPages>
            </Link>
          </CenterPosts>
        )}
        <CenterPosts>
          {data && !loading ? (
            data!.GetPosts!.posts!.map((el) => (
              <Post key={el.id}>
                <EitherSideofPost>
                  <SecondaryHeading
                    style={{ marginLeft: '1rem', marginTop: '1rem' }}
                  >
                    {el.description}
                  </SecondaryHeading>
                </EitherSideofPost>
                <MarginTopImage>
                  <Image src={el.photoPath} />
                </MarginTopImage>
                <EitherSideofPost>
                  <LinkToPages
                    onClick={() => router.push(`/posts/${el.user.username}`)}
                  >
                    post by {el.user.username}
                  </LinkToPages>

                  <RedditStyleUpVote
                    onClick={() => votesHandler(el.id, 'upvote')}
                  />
                  <div
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    {aggregatePosts(el.votes)}
                  </div>
                  <RedditStyleDownVote
                    onClick={() => votesHandler(el.id, 'downvote')}
                  />
                  <NavButton
                    style={{ backgroundColor: 'inherit' }}
                    onClick={() => webShareHandler(el.id, el.user.username)}
                  >
                    <ShareButton /> Share Post
                  </NavButton>
                </EitherSideofPost>
              </Post>
            ))
          ) : (
            <CenterPosts>
              <SVG />
            </CenterPosts>
          )}
        </CenterPosts>
      </Page>
    </>
  );
};

export default withApollo({ ssr: true })(Posts);
