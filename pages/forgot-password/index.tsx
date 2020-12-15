import Head from 'next/head';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ButtonsParent,
  PrimaryButton,
  SecondaryButton,
} from '../../components/button.style';
import { SecondaryHeading } from '../../components/header.style';
import { CenterInputs, Input } from '../../components/input.style';
import { useForgotPasswordMutation } from '../../generated/graphql';
import withApollo from '../../libs/withApollo';
const Index = () => {
  const [
    forgotPasswordMutation,
    { data, loading },
  ] = useForgotPasswordMutation();
  const [email, setEmail] = useState<string>();
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    forgotPasswordMutation({ variables: { email: email! } });
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
  if (data?.ForgotPassword === null) {
    notify('uh oh wrong email. please try again 😢 ');
  }
  if (data?.ForgotPassword) {
    return (
      <CenterInputs>
        <SecondaryHeading>Please check your email.</SecondaryHeading>
      </CenterInputs>
    );
  }
  return (
    <>
      <Head>
        <title>Setupy - Forgot Password</title>
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
          Please enter the email you used to register
        </SecondaryHeading>
        <Input
          type='email'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <ButtonsParent>
          <PrimaryButton disabled={loading} onClick={submitHandler}>
            Get email
          </PrimaryButton>
          <SecondaryButton disabled={loading}>Get email</SecondaryButton>
        </ButtonsParent>
      </CenterInputs>
    </>
  );
};
export default withApollo({ ssr: false })(Index);
