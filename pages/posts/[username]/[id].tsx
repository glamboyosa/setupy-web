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
import { useGetPostByIdQuery } from '../../../generated/graphql';
import withApollo from '../../../libs/withApollo';
const PostById = () => {
  const router = useRouter();
  const [webShareError, setWebShareError] = useState<string | null>(null);
  const { id: userId } = router.query;
  const id = parseInt(userId as string);
  const { data, loading } = useGetPostByIdQuery({ variables: { id } });
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
                      data!.GetPostById!.post!.username
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
                <Link href={`/posts/${data.GetPostById.post.username}`}>
                  <LinkToPages>post by glamboyosa</LinkToPages>
                </Link>
              </EitherSideofPost>
            </Post>
          ) : (
            <svg
              width='55'
              height='80'
              viewBox='0 0 55 80'
              xmlns='http://www.w3.org/2000/svg'
              fill='#034245'
            >
              <g transform='matrix(1 0 0 -1 0 80)'>
                <rect width='10' height='20' rx='3'>
                  <animate
                    attributeName='height'
                    begin='0s'
                    dur='4.3s'
                    values='20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20'
                    calcMode='linear'
                    repeatCount='indefinite'
                  />
                </rect>
                <rect x='15' width='10' height='80' rx='3'>
                  <animate
                    attributeName='height'
                    begin='0s'
                    dur='2s'
                    values='80;55;33;5;75;23;73;33;12;14;60;80'
                    calcMode='linear'
                    repeatCount='indefinite'
                  />
                </rect>
                <rect x='30' width='10' height='50' rx='3'>
                  <animate
                    attributeName='height'
                    begin='0s'
                    dur='1.4s'
                    values='50;34;78;23;56;23;34;76;80;54;21;50'
                    calcMode='linear'
                    repeatCount='indefinite'
                  />
                </rect>
                <rect x='45' width='10' height='30' rx='3'>
                  <animate
                    attributeName='height'
                    begin='0s'
                    dur='2s'
                    values='30;45;13;80;56;72;45;76;34;23;67;30'
                    calcMode='linear'
                    repeatCount='indefinite'
                  />
                </rect>
                <rect x='15' width='10' height='80' rx='3'>
                  <animate
                    attributeName='height'
                    begin='0s'
                    dur='2s'
                    values='80;55;33;5;75;23;73;33;12;14;60;80'
                    calcMode='linear'
                    repeatCount='indefinite'
                  />
                </rect>
              </g>
            </svg>
          )}
        </CenterPosts>
      </Page>
    </>
  );
};
export default withApollo({ ssr: true })(PostById);
