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
  data: {
    name: string;
    price: number;
    src: string[];
    quantity: number;
    id: string;
    category: string;
    description: string;
    sizes: Number[] | string[];
    composition?: string[];
  }[];
}

interface Data {
  name: string;
  price: number;
  src: string[];
  quantity: number;
  id: string;
  category: string;
  description?: string;
  sizes?: Number[] | string[];
  composition?: string[];
}

const ApparelCategoriePage: NextPage<Props> = ({ data }) => {
  if (!data) return <Loading />;
  if (data.length === 0) return <NotFoundPage />;
  return <SingleCategoryPage categoryData={data} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const route = context.params!.category as string;
  const data = await getSingleCategoryData('apparel', route);
  return {
    props: { data },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Data[] = await getDataForCategory('apparel');
  const params = data.map((cloth) => ({
    params: { category: cloth.category },
  }));

  return {
    paths: params,
    fallback: false,
  };
};

export default ApparelCategoriePage;
