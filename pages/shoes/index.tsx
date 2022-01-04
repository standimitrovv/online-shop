import type { NextPage, GetStaticProps } from 'next';

//Data extracting function
import { getDataForCategory } from '../../lib/firebaseData';

//Components
import NotFoundPage from '../../components/pages/not-found';
import AllCategoriesPage from '../../components/pages/categories/all-categories';
import Loading from '../../components/ui/loading';

interface Props {
  shoes: {
    name: string;
    price: number;
    src: string[];
    id: string;
    quantity: number;
    category: string;
    description?: string;
    sizes: Number[];
  }[];
}

const ShoesPage: NextPage<Props> = ({ shoes }) => {
  if (!shoes) return <Loading />;
  if (shoes.length === 0) return <NotFoundPage />;
  return <AllCategoriesPage items={shoes} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const shoes = await getDataForCategory('shoes');

  return {
    props: {
      shoes,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ShoesPage;
