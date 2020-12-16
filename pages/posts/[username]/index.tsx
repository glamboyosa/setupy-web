import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavButton } from '../../../components/button.style';
import {
  PrimaryHeading,
  SecondaryHeading,
} from '../../../components/header.style';
import { LinkToPages } from '../../../components/links.style';
import { Input, Label, Nav, NavItems } from '../../../components/nav.style';
import {
  CenterPosts,
  EitherSideofPost,
  Image,
  MarginTopImage,
  Page,
  Post,
} from '../../../components/posts.style';
import SVG from '../../../components/svg';
import {
  useGetPostsByUserQuery,
  useLogoutMutation,
} from '../../../generated/graphql';
import { Context } from '../../../libs/userProvider';
import withApollo from '../../../libs/withApollo';
const PostsByUser = () => {
  const [spellCheckk, setSpellCheck] = useState(false);
  const [webShareError, setWebShareError] = useState<string | null>(null);
  const [logoutMutation, { loading }] = useLogoutMutation();
  const router = useRouter();
  const { username } = router.query;
  const { data } = useGetPostsByUserQuery({
    variables: { username: username as string },
  });
  const { user, setUserHandler } = useContext(Context);
  const logoutHandler = () => {
    logoutMutation();
    setUserHandler(null);
  };
  const webShareHandler = async (id: number, username: string) => {
    try {
      await navigator.share({
        title: 'Setupy - Posts🔥',
        text: 'Check out this sweet setup',
        url: `https://setupy-web.vercel.app/posts/${username}/${id}`,
      });
    } catch (e) {
      setWebShareError("Oops. Sharing isn't supported in your browser");
    }
  };
  const notify = (error: string) =>
    toast.error(error, {
      position: 'top-center',
      type: 'error',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  if (webShareError) {
    notify(webShareError);
  }
  return (
    <>
      <Head>
        <title>Setupy - Posts by {username}🔥</title>
      </Head>
      <NextSeo
        title={`Setupy - ${username} Posts 🔥`}
        openGraph={{
          url:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/posts'
              : `https://setupy-web.vercel.app/posts${username}`,
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
        {data && !loading ? (
          data!.GetPostsByUser!.posts!.map((el) => (
            <CenterPosts>
              <Post>
                <EitherSideofPost>
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
                    <LinkToPages>post by glamboyosa</LinkToPages>
                  </Link>
                </EitherSideofPost>
              </Post>
            </CenterPosts>
          ))
        ) : (
          <CenterPosts>
            <SVG />
          </CenterPosts>
        )}
      </Page>
    </>
  );
};

export default withApollo({ ssr: true })(PostsByUser);
