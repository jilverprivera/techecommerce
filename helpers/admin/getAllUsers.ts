import { User } from '../../interfaces/userContext';

export const getUsers = async () => {
  const response = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response): Promise<User[]> => response.json());
  return response;
};
