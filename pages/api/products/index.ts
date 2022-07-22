import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import Product from 'models/product';
import MongoConnect from 'utils/MongoConnection';

import { methods } from 'interfaces/backend/methods';
import { ProductInterface } from 'interfaces/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await MongoConnect();
  const { method } = req;

  switch (method) {
    case methods.GET:
      try {
        const products = await Product.find();
        if (products.length === 0) {
          return res.status(400).json({ products: [] });
        }
        return res.status(200).json(products);
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }

    case methods.POST:
      await MongoConnect();
      try {
        const { image, ...body }: ProductInterface = req.body;
        if (!image) {
          return res.status(400).json({ message: 'No image upload.' });
        }
        const newProduct = new Product({ image, ...body });
        newProduct.product_id = v4();
        await newProduct.save();
        return res.status(201).json({ product: newProduct });
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }

    default:
      return res.status(400).json({ message: 'Method not allowed.' });
  }
}
