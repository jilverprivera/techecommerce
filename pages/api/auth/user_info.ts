import type { NextApiRequest, NextApiResponse } from 'next';

import decodeJWT from 'utils/decodeJWT';
import MongoConnect from 'utils/MongoConnection';

import { methods } from 'interfaces/backend/methods';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  MongoConnect();
  if (req.method !== methods.GET) {
    return res.status(400).json({ message: 'Only request with GET method are allowed.' });
  }

  const token = req.cookies['token'];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not found token.' });
  }
  try {
    const user = await decodeJWT(token);
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: 'Error on DB, call an administrator.' });
  }
}
