import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import { useRegisterMutation } from '../generated/graphql';
import withApollo from '../libs/withApollo';
const Register = () => {
  const [registerMutation, { data, loading }] = useRegisterMutation();
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [errorState, setErrorState] = useState(true);
  useEffect(() => {
    if (data?.Register === null && errorState) {
      notify('uh oh something went wrong. please try again 😢 ');
      setErrorState(false);
    }
  }, [data]);
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    registerMutation({
      variables: { email: email!, password: password!, username: username! },
    });
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

  if (data?.Register) {
    router.back();
  }
  return (
    <>
      <Head>
        <title>Setupy - Register</title>
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
          Register to see what your pals are up to
        </SecondaryHeading>
        <Input
          type='text'
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Link href='/login'>
          <LinkToPages>Already have an account? Sign in.</LinkToPages>
        </Link>
        <Link href='/forgot-password'>
          <LinkToPages>Forgot password.</LinkToPages>
        </Link>
      </CenterInputs>
    </>
  );
};
export default withApollo({ ssr: false })(Register);
