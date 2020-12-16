import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavButton } from '../../../components/button.style';
import { SecondaryHeading } from '../../../components/header.style';
import { LinkToPages } from '../../../components/links.style';
import {
  CenterPosts,
  EitherSideofPost,
  Image,
  MarginTopImage,
  Page,
  Post,
} from '../../../components/posts.style';
import SVG from '../../../components/svg';
import { useGetPostByIdQuery } from '../../../generated/graphql';
import withApollo from '../../../libs/withApollo';
const PostById = () => {
  const router = useRouter();
  const [webShareError, setWebShareError] = useState<string | null>(null);
  const { id: userId } = router.query;
  const id = parseInt(userId as string);
  const { data, loading, error } = useGetPostByIdQuery({ variables: { id } });

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
        <title>Setupy 🔥</title>
      </Head>
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
        <CenterPosts>
          {data?.GetPostById.post && !loading ? (
            <Post>
              <EitherSideofPost>
                <NavButton
                  onClick={() =>
                    webShareHandler(
                      data!.GetPostById!.post!.id,
                      data!.GetPostById!.post!.user.username
                    )
                  }
                >
                  Share Post
                </NavButton>
              </EitherSideofPost>
              <EitherSideofPost>
                <MarginTopImage>
                  <Image
                    src={data.GetPostById.post.photoPath}
                    width='auto'
                    height='auto'
                  />
                </MarginTopImage>
                <SecondaryHeading>
                  {data.GetPostById.post.description}
                </SecondaryHeading>
                <Link href={`/posts/${data.GetPostById.post.user.username}`}>
                  <LinkToPages>post by glamboyosa</LinkToPages>
                </Link>
              </EitherSideofPost>
            </Post>
          ) : (
            <SVG />
          )}
        </CenterPosts>
      </Page>
    </>
  );
};
export default withApollo({ ssr: true })(PostById);
