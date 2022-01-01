import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';

//Data extracting functions
import {
  getAllDataFromCollection,
  getSingleCategoryData,
} from '../../lib/firebaseData';

//Components
import SingleCategoryPage from '../../components/pages/categories/single-category';
import NotFoundPage from '../../components/pages/not-found';
import Loading from '../../components/ui/loading';

interface Props {
  categoryData: {
    name: string;
    price: number;
    quantity: number;
    src: string[];
    id: string;
    category: string;
    description: string;
    sizes: Number[];
  }[];
}

interface CategoryData {
  name: string;
  price: number;
  src: string[];
  id: string;
  category: string;
  quantity: number;
  description: string;
  sizes: Number[] | string[];
  composition?: string[];
}

const ShoeCategoriePage: NextPage<Props> = ({ categoryData }) => {
  if (!categoryData) return <Loading />;
  if (categoryData.length === 0) return <NotFoundPage />;
  return <SingleCategoryPage categoryData={categoryData} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryData: CategoryData[] = await getAllDataFromCollection('shoes');
  const params = categoryData.map((shoe: CategoryData) => ({
    params: { category: shoe.category },
  }));

  return {
    paths: params,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!.category! as string;
  const categoryData = await getSingleCategoryData('shoes', params);

  return {
    props: { categoryData },
    revalidate: 60 * 60 * 24,
  };
};

export default ShoeCategoriePage;
