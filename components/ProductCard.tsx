import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ProductInterface } from 'interfaces/products';

const ProductCard = ({ _id, image, name, price }: ProductInterface) => {
  const [currentHover, setCurrentHover] = useState<string | null>(null);

  return (
    <Link href={`/${_id}`}>
      <a
        onMouseEnter={() => setCurrentHover(_id)}
        onMouseLeave={() => setCurrentHover(null)}
        className="bg-white overflow-hidden rounded-xl border-2 border-gray-100"
      >
        <div className="w-full rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            className={`duration-200 
            ${currentHover === _id ? 'scale-105 ' : 'scale-100'}`}
            src={image.url}
            alt={name}
            width={680}
            height={680}
            quality={100}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center p-3">
          <h4 className="w-full text-sm font-textRegular tracking-wide mb-2">{name}</h4>
          <div className="flex items-center justify-center">
            <p className="text-lg font-textSemibold mr-3">${price}</p>
            <p className="text-sm font-textRegular line-through text-gray-400">${(price += price * 0.1)}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
