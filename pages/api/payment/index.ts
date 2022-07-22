import { methods } from 'interfaces/backend/methods';
import { NextApiRequest, NextApiResponse } from 'next';
import decodeJWT from 'utils/decodeJWT';
import Payment from 'models/payment';

interface Response {
  success?: boolean;
  message?: string;
  data?: any[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { method } = req;
  switch (method) {
    case methods.GET:
      const token = req.cookies['token'];
      const { cart, address, paymentID } = req.body;
      const user = decodeJWT(token);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'Something went wrong recollecting the user data.' });
      }

      const newPayment = new Payment({
        cart,
        address,
        paymentID,
      });

    default:
      res.status(400).json({ message: 'Method not allowed' });
  }
}
