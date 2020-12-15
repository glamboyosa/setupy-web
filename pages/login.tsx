import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
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
import { useLoginMutation } from '../generated/graphql';
import { Context } from '../libs/userProvider';
import withApollo from '../libs/withApollo';
type ReferrerisRegister = boolean | undefined;
const Login = ({
  referrerIsRegister,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { setUserHandler } = useContext(Context);
  const [loginMutation, { data, loading }] = useLoginMutation();
  const [email, setEmail] = useState<string>();
  const [errorState, setErrorState] = useState(true);
  const [password, setPassword] = useState<string>();
  useEffect(() => {
    if (data?.Login.user && !referrerIsRegister) {
      setUserHandler(data.Login.user);
      router.back();
    } else if (data?.Login.user && referrerIsRegister) {
      setUserHandler(data.Login.user);
      router.push('/posts');
    }
  }, [data]);
  useEffect(() => {
    if (data?.Login.error && errorState) {
      notify(data!.Login.error!.message!);
      setErrorState(false);
    }
  }, [data]);
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginMutation({ variables: { email: email!, password: password! } });
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

  return (
    <>
      <Head>
        <title>Setupy - Login</title>
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
      <CenterInputs>
        <SecondaryHeading>
          Login to see what your pals are up to
        </SecondaryHeading>
        <Input
          type='email'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonsParent>
          <PrimaryButton disabled={loading} onClick={submitHandler}>
            Let's Go
          </PrimaryButton>
          <SecondaryButton disabled={loading}>Let's Go</SecondaryButton>
        </ButtonsParent>
        <Link href='/register'>
          <LinkToPages>Don't have an account? Sign up.</LinkToPages>
        </Link>
        <Link href='/forgot-password'>
          <LinkToPages>Forgot password.</LinkToPages>
        </Link>
      </CenterInputs>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const referrerIsRegister: ReferrerisRegister = context.req.headers.referer?.includes(
    'register'
  );
  return {
    props: {
      referrerIsRegister,
    },
  };
};
export default withApollo({ ssr: false })(Login);
