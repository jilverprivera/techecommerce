import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import User from 'models/user';
import generateJWT from 'utils/generateJWT';
import MongoConnect from 'utils/MongoConnection';

import { methods } from 'interfaces/backend/methods';
import { SignUpInterface } from 'interfaces/userContext';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await MongoConnect();

  if (req.method !== methods.POST) {
    return res.status(400).json({ message: 'Only request with POST method are allowed.' });
  }

  const { name, email, password }: SignUpInterface = req.body;
  try {
    const newUser = new User({ name, email, password });
    newUser.password = await bcrypt.hash(password, 15);
    const token = await generateJWT(String(newUser._id));
    await newUser.save();
    return res.status(201).json({ token, user: newUser });
  } catch (err) {
    return res.status(500).json({ message: 'Error on DB.', err });
  }
}
