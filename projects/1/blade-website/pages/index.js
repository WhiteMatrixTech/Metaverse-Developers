import Banner from 'components/index/Banner';
import Connect from 'components/index/Connect';
import Intro from 'components/index/Intro';
import Partner from 'components/index/Partner';
import Gallery from 'components/index/Gallery';
import Article from 'components/index/Article';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    let anchor = document.getElementById(router.query.pos);
    if (anchor) {
      window.scrollTo(0, anchor.offsetTop - 60);
    }
  }, [router.query]);
  return (
    <Layout>
      <div>
        <Banner />
        <Connect />
        <Intro />
        <Gallery />
        <Article />
        <Partner />
      </div>
    </Layout>
  );
}
