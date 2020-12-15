import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import {
  ButtonsParent,
  PrimaryButton,
  SecondaryButton,
} from '../components/button.style';
import {
  Header,
  PrimaryHeading,
  SecondaryHeading,
} from '../components/header.style';

function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Setupy - Home</title>
      </Head>
      <NextSeo
        title='Setupy 🔥'
        openGraph={{
          url:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/'
              : 'https://setupy-web.vercel.app',
          title: 'Setupy 🔥',
          images: [
            {
              url:
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=752&q=80',
            },
          ],
        }}
        twitter={{ cardType: 'summary_large_image' }}
      />
      <Header>
        <PrimaryHeading style={{ color: 'white' }}>
          Setupy - Reddit but for dev setups 🔥
        </PrimaryHeading>
        <SecondaryHeading style={{ color: 'white' }}>
          See what your dev friends are pushing with.
        </SecondaryHeading>
        <ButtonsParent>
          <PrimaryButton onClick={() => router.push('/posts')}>
            Let's Go
          </PrimaryButton>
          <SecondaryButton>Let's Go</SecondaryButton>
        </ButtonsParent>
      </Header>
    </>
  );
}
export default Home;
