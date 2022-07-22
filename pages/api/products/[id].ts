import type { NextApiRequest, NextApiResponse } from 'next';

import Product from 'models/product';
import MongoConnect from 'utils/MongoConnection';

import { methods } from 'interfaces/backend/methods';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
  } = req;
  await MongoConnect();

  switch (method) {
    case methods.GET:
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(400).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }

    case methods.PUT:
      try {
        const productToUpdate = await Product.findByIdAndUpdate({ _id: id }, { ...req.body });
        if (!productToUpdate) {
          return res.status(400).json({ message: `Product: ${id} not found` });
        }
        return res.status(200).json({ message: `Product: ${id} updated successfully.` });
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }

    case methods.DELETE:
      try {
        const productToRemove = await Product.findByIdAndRemove(id);
        if (!productToRemove) {
          return res.status(400).json({ message: `Product: ${id} not found` });
        }
        return res.status(200).json({ message: `Product: ${id} removed successfully.` });
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }

    default:
      return res.status(400).json({ message: 'Method not allowed.' });
  }
}
