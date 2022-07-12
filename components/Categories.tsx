import {useCategories} from '../hooks/useCategories';

const Categories = () => {
  const {categories, categoriesLoading} = useCategories();

  return (
    <div className="col-span-3 mx-auto max-w-7xl w-full ">
      {categoriesLoading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="w-full">
          <span className="mb-5 text-xl font-supremeMedium block">
            Categories
          </span>
          <button className="mb-5 block hover:cursor-default text-sm">
            All
          </button>
          {categories?.map(category => (
            <button
              key={category._id}
              className="mb-5 block hover:cursor-default text-sm">
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
