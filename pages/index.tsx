import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

//Data extracting function
import { getAllDataFromCollection } from '../lib/firebaseData';

//Components
import Home from '../components/pages/home';
import Loading from '../components/ui/loading';
import NotFoundPage from '../components/pages/not-found';

interface Props {
  items: {
    name: string;
    id: string;
    href: string;
    alt: string;
    src: string;
    order: number;
  }[];
}

const HomePage: NextPage<Props> = ({ items }) => {
  if (!items) return <Loading />;
  if (items.length === 0) return <NotFoundPage />;
  return <Home items={items} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const items = await getAllDataFromCollection('home');
  if (!items) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      items,
    },
    revalidate: 60 * 60 * 24,
  };
};
export default HomePage;
