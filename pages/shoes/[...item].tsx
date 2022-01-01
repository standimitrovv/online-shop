import type { NextPage, GetServerSideProps } from 'next';

//Data extracting function
import { getSingleItemData } from '../../lib/firebaseData';

//Components
import CategoryItemPage from '../../components/pages/categories/category-item';
import NotFoundPage from '../../components/pages/not-found';
import Loading from '../../components/ui/loading';

interface Props {
  item: {
    category: string;
    description: string;
    name: string;
    id: string;
    quantity: number;
    price: number;
    sizes: number[];
    src: string[];
    composition: string[];
    sizeGuide: string;
  };
}

const Shoe: NextPage<Props> = ({ item }) => {
  if (!item) return <Loading />;
  if ([item].length === 0) return <NotFoundPage />;
  return <CategoryItemPage item={item} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [category, itemId] = context.query!.item as string[];
  const item = await getSingleItemData('shoes', itemId);
  return {
    props: { item },
  };
};

export default Shoe;
