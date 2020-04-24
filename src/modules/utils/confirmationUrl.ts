import { v4 } from 'uuid';
import { redis } from '../../redis';
import { prefixes } from '../../constants';

export const confirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(prefixes.confirmEmail + token, userId, 'ex', 60 * 60 * 24);
  
  return `http://localhost:3000/user/confirm/${token}`;
};
