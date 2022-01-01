import type { NextPage, GetStaticProps } from 'next';

//Data extracting function
import { getAllDataFromCollection } from '../../lib/firebaseData';

//Component
import AllCategoriesPage from '../../components/pages/categories/all-categories';

interface Props {
  data: {
    name: string;
    price: number;
    src: string[];
    id: string;
    quantity: number;
    category: string;
    description: string;
    sizes: Number[] | string[];
    composition?: string[];
  }[];
}

const ApparelPage: NextPage<Props> = ({ data }) => {
  return <AllCategoriesPage items={data} />;
};
export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllDataFromCollection('apparel');
  return {
    props: { data },
    revalidate: 60 * 60 * 24,
  };
};
export default ApparelPage;
