import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ButtonsParent,
  PrimaryButton,
  SecondaryButton,
} from '../components/button.style';
import { SecondaryHeading } from '../components/header.style';
import { CenterInputs, Input } from '../components/input.style';
import { LinkToPages } from '../components/links.style';
import { Page } from '../components/posts.style';
import { useCreatePostMutation } from '../generated/graphql';
import { Context } from '../libs/userProvider';
import withApollo from '../libs/withApollo';
const Uploads = () => {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [description, setDescription] = useState<string>();
  const { user } = useContext(Context);
  const [
    createPostMutation,
    { data, error, loading },
  ] = useCreatePostMutation();
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', fileInput.current!.files![0]);
    formData.append('upload_preset', 'my_upload_preset');
    fetch('https://api.cloudinary.com/v1_1/glamboyosa/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((cloudinaryData) => {
        createPostMutation({
          variables: {
            username: user!.username,
            picture: cloudinaryData.url,
            description: description!,
          },
        });
      })
      .catch((err) => notify('error', err.message));
  };
  const notify = (type: 'error' | 'success', message?: string) =>
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

  if (data?.CreatePosts.error) {
    notify('error', data?.CreatePosts.error?.message);
  }

  if (data?.CreatePosts.post) {
    notify('success', 'successfully uploaded Post');
    setTimeout(() => router.push('/posts'), 6500);
  }
  return (
    <>
      <Head>
        <title>Setupy - Post Setup</title>
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
        <Modal
          isOpen
          style={{ content: { boxShadow: '.5rem 1rem 1rem #000' } }}
        >
          {!user ? (
            <CenterInputs>
              <SecondaryHeading>
                You need to register & sign in to share your awesome setups :(
              </SecondaryHeading>
              <Link href='/login'>
                <LinkToPages>Proceed to log in page.</LinkToPages>
              </Link>
            </CenterInputs>
          ) : (
            <CenterInputs style={{ marginTop: '15%' }}>
              <Input type='file' ref={fileInput} />
              <Input
                type='text'
                placeholder='your awesome description'
                onChange={(e) => setDescription(e.target.value)}
              />
              <ButtonsParent>
                <PrimaryButton disabled={loading} onClick={submitHandler}>
                  Let's Go
                </PrimaryButton>
                <SecondaryButton disabled={loading}>Let's Go</SecondaryButton>
              </ButtonsParent>
            </CenterInputs>
          )}
        </Modal>
      </Page>
    </>
  );
};
export default withApollo({ ssr: false })(Uploads);
