import type { NextPage, GetStaticProps } from 'next';

//Data extracting function
import { getDataForCategory } from '../../lib/firebaseData';

//Component
import AllCategoriesPage from '../../components/pages/categories/all-categories';

interface Props {
  accessories: {
    name: string;
    price: number;
    src: string[];
    quantity: number;
    id: string;
    category: string;
    description?: string;
    sizes?: Number[] | string[];
    composition?: string[];
  }[];
}

const AccessoriesPage: NextPage<Props> = ({ accessories }) => {
  return <AllCategoriesPage items={accessories} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const accessories = await getDataForCategory('accessories');

  return {
    props: { accessories },
    revalidate: 60 * 60 * 24,
  };
};

export default AccessoriesPage;
