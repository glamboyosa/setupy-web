import Head from 'next/head';
import { useRouter } from 'next/router';
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
import { useChangePasswordMutation } from '../../generated/graphql';
import withApollo from '../../libs/withApollo';
const ForgotPassword = () => {
  const router = useRouter();
  const { jid } = router.query;
  const token = jid as string;
  const [
    forgotPasswordMutation,
    { data, loading },
  ] = useChangePasswordMutation();
  const [password, setPassword] = useState<string>();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    forgotPasswordMutation({ variables: { newPassword: password!, token } });
  };
  const notify = (message: string, type: 'error' | 'success') =>
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
  if (data?.ChangePassword === null) {
    notify(
      'uh oh something is wrong 😢 Please visit the forgot password page again ',
      'error'
    );
  }
  if (data?.ChangePassword) {
    notify('success! redirecting you to homepage shortly', 'success');
    setTimeout(() => router.push('/'), 6000);
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
        <SecondaryHeading>Please enter new password</SecondaryHeading>
        <Input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonsParent>
          <PrimaryButton disabled={loading} onClick={submitHandler}>
            Change Password
          </PrimaryButton>
          <SecondaryButton disabled={loading}>Change Password</SecondaryButton>
        </ButtonsParent>
      </CenterInputs>
    </>
  );
};
export default withApollo({ ssr: false })(ForgotPassword);
