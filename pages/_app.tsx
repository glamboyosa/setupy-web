import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import UserProvider from '../libs/userProvider';
import GlobalStyles from '../styles/globalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <UserProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
