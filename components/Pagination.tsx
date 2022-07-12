import {useState} from 'react';

interface Props {
  itemsPerPage: number;
  totalItems: number;
  paginate: (number: number) => void | any;
}
const Pagination = ({itemsPerPage = 10, totalItems, paginate}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const SetThePage = (number: number, i: number) => {
    paginate(number);
    setCurrentIndex(i);
  };
  return (
    <nav className="mx-auto my-2">
      <ul className="flex items-center justify-center list-none">
        {pageNumbers.map((number, index) => {
          return (
            <li
              className={`text-sm mx-2 px-2 py-4 ${
                index === currentIndex
                  ? 'font-semibold bg-stone-600 rounded-md'
                  : 'font-light hover:cursor-pointer'
              }`}
              key={number}>
              <span onClick={() => SetThePage(number, index)}>{number}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
