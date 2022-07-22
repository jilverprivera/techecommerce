import { tokenResponse } from '../../interfaces/userContext';

export const tokenRevalidation = async () => {
  const response = await fetch('/api/auth/token_renew', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response): Promise<tokenResponse> => response.json());

  return response;
};
