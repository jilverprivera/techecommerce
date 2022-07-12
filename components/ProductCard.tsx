import Image from 'next/image';
import Link from 'next/link';
import {ProductInterface} from '../interfaces/products';

const ProductCard = ({
  _id,
  product_id,
  images,
  name,
  sold,
  stock,
  price,
  description,
}: ProductInterface) => {
  return (
    <Link href={`/shop/${_id}`}>
      <a className="w-full overflow-hidden relative rounded-sm">
        <Image
          className="hover:scale-105 duration-200"
          src={images.url}
          alt={product_id}
          width={384}
          height={384}
          quality={100}
        />
        <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm p-3 ">
          <h4 className="text-sm font-light">Stock: {stock}</h4>
          <h4>{name}</h4>
          <p className="text-sm font-light">{description}</p>
          <p className="text-sm font-semibold">${price} USD</p>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
