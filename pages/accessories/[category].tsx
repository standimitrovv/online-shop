import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';

//Data extracting functions
import {
  getSingleCategoryData,
  getDataForCategory,
} from '../../lib/firebaseData';

//Components
import NotFoundPage from '../../components/pages/not-found';
import Loading from '../../components/ui/loading';
import SingleCategoryPage from '../../components/pages/categories/single-category';

interface Props {
  categoryData: {
    name: string;
    price: number;
    src: string[];
    id: string;
    quantity: number;
    category: string;
    description?: string;
    composition: string[];
  }[];
}
interface Data {
  name: string;
  price: number;
  quantity: number;
  src: string[];
  id: string;
  category: string;
  description?: string;
  composition?: string[];
}

const SingleAccessoryCategory: NextPage<Props> = ({ categoryData }) => {
  if (!categoryData) return <Loading />;
  if (categoryData.length === 0) return <NotFoundPage />;
  return <SingleCategoryPage categoryData={categoryData} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params!.category as string;
  const formattedCategory = /\s*/g.test(category)
    ? category.split(' ').join('-')
    : category;
  const categoryData = await getSingleCategoryData(
    'accessories',
    formattedCategory
  );
  return {
    props: { categoryData },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Data[] = await getDataForCategory('accessories');
  const paths = data.map((accessory) => ({
    params: { category: accessory.category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default SingleAccessoryCategory;
