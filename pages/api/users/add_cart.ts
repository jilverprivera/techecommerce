import type { NextApiRequest, NextApiResponse } from 'next';

import User from 'models/user';
import MongoConnect from 'utils/MongoConnection';
import decodeJWT from 'utils/decodeJWT';

import { methods } from 'interfaces/backend/methods';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await MongoConnect();
  try {
    if (req.method !== methods.PATCH) {
      return res.status(400).json({ message: 'Only request with PATCH method are allowed.' });
    }
    const token = req.cookies['token'];
    if (!token) {
      return res.status(401).json({ message: 'No token found.' });
    }
    const user = await decodeJWT(token);
    if (!user) {
      return res.status(400).json({ message: 'No user found.' });
    }
    await User.findByIdAndUpdate({ _id: user._id }, { cart: req.body.cart });
    return res.status(200).json({ message: 'Product added to cart.' });
  } catch (err) {
    return res.status(500).json({ message: 'Error on DB.', err });
  }
}
