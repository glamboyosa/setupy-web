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
  ShareButton,
} from '../../../components/posts.style';
import SVG from '../../../components/svg';
import { useGetPostByIdQuery } from '../../../generated/graphql';
import useDetectDevice from '../../../libs/useDetectDevice';
import withApollo from '../../../libs/withApollo';
const PostById = () => {
  const router = useRouter();
  const [webShareError, setWebShareError] = useState<string | null>(null);
  const { id: userId } = router.query;
  const id = parseInt(userId as string);
  const { data, loading, error } = useGetPostByIdQuery({ variables: { id } });
  const { isDesktop } = useDetectDevice();
  const webShareHandler = async (id: number, username: string) => {
    try {
      if (isDesktop) {
        window.location = (`https://twitter.com/share?url=https://setupy-web.vercel.app/posts/${username}/${id}&text=Check out this hot post by ${username}` as unknown) as Location;
        return;
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
                <SecondaryHeading
                  style={{ marginLeft: '1rem', marginTop: '1rem' }}
                >
                  {data.GetPostById.post.description}
                </SecondaryHeading>
              </EitherSideofPost>
              <MarginTopImage>
                <Image src={data.GetPostById.post.photoPath} />
              </MarginTopImage>
              <EitherSideofPost>
                <LinkToPages
                  onClick={() =>
                    router.push(
                      `/posts/${data.GetPostById.post?.user.username}`
                    )
                  }
                >
                  post by {data.GetPostById.post.user.username}
                </LinkToPages>

                <NavButton
                  style={{ backgroundColor: 'inherit' }}
                  onClick={() =>
                    webShareHandler(
                      data.GetPostById.post!.id,
                      data.GetPostById.post!.user.username
                    )
                  }
                >
                  <ShareButton /> Share Post
                </NavButton>
              </EitherSideofPost>
            </Post>
          ) : (
            <SVG />
          )}
          <LinkToPages
            style={{ fontSize: '2rem' }}
            onClick={() => router.push('/posts')}
          >
            See all posts
          </LinkToPages>
        </CenterPosts>
      </Page>
    </>
  );
};
export default withApollo({ ssr: true })(PostById);
