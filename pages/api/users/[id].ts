import type { NextApiRequest, NextApiResponse } from 'next';

import User from 'models/user';
import MongoConnect from 'utils/MongoConnection';

import { methods } from 'interfaces/backend/methods';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case methods.GET:
      await MongoConnect();
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }

    case methods.DELETE:
      await MongoConnect();
      try {
        const UserToRemove = await User.findByIdAndRemove(id);
        if (!UserToRemove) {
          return res.status(400).json({ message: `User: ${id} not found` });
        }
        return res.status(200).json({ message: 'User removed successfully.' });
      } catch (err) {
        return res.status(500).json({ message: 'Error on DB.', err });
      }

    default:
      return res.status(400).json({ message: 'Method not allowed.' });
  }
}
