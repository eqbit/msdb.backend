import { v4 } from 'uuid';
import { redis } from '../../../Redis';
import { prefixes } from '../../../constants';

export const restorePasswordUrl = async (userId: number) => {
  const token = v4();
  await redis.set(prefixes.changePassword + token, userId, 'ex', 60 * 60 * 24);
  
  return `http://localhost:3000/user/change-password/${token}`;
};
