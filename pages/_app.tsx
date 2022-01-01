import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

//Components
import Layout from '../components/layout/layout';
import Footer from '../components/ui/footer';

//Redux
import { Provider } from 'react-redux';
import store from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Stanley</title>
        </Head>
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </Provider>
  );
}

export default MyApp;
