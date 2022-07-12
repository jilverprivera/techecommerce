import Link from 'next/link';
import {useCategories} from '../hooks/useCategories';

interface Props {
  title: string;
}
const CategoriesView = ({title}: Props) => {
  const {categories, categoryLoading} = useCategories();
  return (
    <div className="max-w-screen-xl w-full mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-5">{title}</h2>

      <div className="grid grid-cols-4">
        {categories?.map((category, i: number) => (
          <Link key={category._id} href={`/shop/${category._id}`}>
            <a
              className={`border-2 w-full h-full
                ${i === 0 && 'row-span-2'} 
                ${i === 1 && 'col-span-2'}
                ${i === 4 && 'row-span-2'}
                ${i === 5 && 'col-span-2'}
                ${i === 6 && 'col-start-4 row-start-2'}`}>
              {category.name}
              <p>{category.createdAt}</p>
              {i}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesView;
