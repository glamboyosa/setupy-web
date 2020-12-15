import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
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
      <Header>
        <PrimaryHeading>Setupy - Reddit but for dev setups 🔥</PrimaryHeading>
        <SecondaryHeading>
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
