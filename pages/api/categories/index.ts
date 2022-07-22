import type { NextApiRequest, NextApiResponse } from 'next';

import category from 'models/category';
import MongoConnect from 'utils/MongoConnection';

import { methods } from 'interfaces/backend/methods';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case methods.GET:
      try {
        await MongoConnect();
        const products = await category.find();
        if (products.length === 0) {
          return res.status(400).json({ message: 'No categories yet.' });
        }
        return res.status(200).json(products);
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }
      break;
    default:
      return res.status(400).json({ message: 'Method not allowed.' });
  }
}
