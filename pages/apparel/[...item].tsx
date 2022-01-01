import type { NextPage, GetServerSideProps } from 'next';

//Data extracting function
import { getSingleItemData } from '../../lib/firebaseData';

//Components
import CategoryItemPage from '../../components/pages/categories/category-item';
import NotFoundPage from '../../components/pages/not-found';
import Loading from '../../components/ui/loading';
interface Props {
  item: {
    name: string;
    id: string;
    category: string;
    composition: string[];
    description: string;
    quantity: number;
    price: number;
    sizes: string[];
    src: string[];
    sizeGuide: string | string[];
  };
}

const SingleApparelItem: NextPage<Props> = ({ item }) => {
  if (!item) return <Loading />;
  if ([item].length === 0) return <NotFoundPage />;
  return <CategoryItemPage item={item} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [category, itemId] = context.params!.item as string[];

  const item = await getSingleItemData('apparel', itemId);

  return {
    props: { item },
  };
};

export default SingleApparelItem;
