import jwt from 'jsonwebtoken';
import User from 'models/user';

const decodeJWT = async (token: string) => {
  const { ACCESS_TOKEN_SECRET_SEED } = process.env;
  const { uid }: any = jwt.verify(String(token), String(ACCESS_TOKEN_SECRET_SEED));
  if (!uid) {
    return;
  }
  const user = await User.findById({ _id: uid });
  if (!user) {
    return;
  }
  return user;
};

export default decodeJWT;
