import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import generateJWT from 'utils/generateJWT';
import MongoConnect from 'utils/MongoConnection';

import { methods } from 'interfaces/backend/methods';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  MongoConnect();
  const { ACCESS_TOKEN_SECRET_SEED } = process.env;

  if (req.method !== methods.GET) {
    return res.status(400).json({ message: 'Only request with GET method are allowed.' });
  }

  const token = req.cookies['token'];

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }
  try {
    const { uid }: any = jwt.verify(String(token), String(ACCESS_TOKEN_SECRET_SEED));
    if (!uid) {
      return res.status(400).json({ message: 'Error with token generation.' });
    }
    const newToken = await generateJWT(uid);
    return res.json({ token: newToken });
  } catch (err) {
    return res.status(500).json({ message: 'Error on DB, call an administrator.' });
  }
}
