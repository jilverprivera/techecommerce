import { UserResponse } from '../../interfaces/userContext';

export const getCurrentUser = async (token: string) => {
  const response = await fetch('/api/auth/user_info', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: token,
    },
  }).then((response): Promise<UserResponse> => response.json());

  return response;
};
