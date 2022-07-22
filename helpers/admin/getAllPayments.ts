export const getHistoryPayments = async (token: string) => {
  const response = await fetch('/api/users/payments', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: token,
    },
  }).then((response) => response.json());
  return response;
};
