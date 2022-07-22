import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import User from 'models/user';
import generateJWT from 'utils/generateJWT';
import MongoConnect from 'utils/MongoConnection';

import { SignInInterface } from 'interfaces/userContext';
import { methods } from 'interfaces/backend/methods';

interface Response {
  success?: boolean;
  message?: string;
  token?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await MongoConnect();

  if (req.method !== methods.POST) {
    return res.status(400).json({ success: false, message: 'Only  method are allowed' });
  }

  const { email, password }: SignInInterface = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: `User email: ${email} does not exist.` });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'User or password are not correct.' });
    }
    const token = await generateJWT(String(user._id));
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error on DB.' });
  }
}
