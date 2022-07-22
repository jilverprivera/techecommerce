import type { NextApiRequest, NextApiResponse } from 'next';

import User from 'models/user';
import MongoConnect from 'utils/MongoConnection';

import { methods } from 'interfaces/backend/methods';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case methods.GET:
      await MongoConnect();
      try {
        const products = await User.find();
        if (products.length === 0) {
          return res.status(400).json({ products: [] });
        }
        return res.status(200).json(products);
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }

    default:
      return res.status(400).json({ message: 'Method not allowed.' });
  }
}
