import { createContext, useContext, useEffect, useState } from 'react';

import { UserContext } from './UserContext';

import { getHistoryPayments } from '../helpers/admin/getAllPayments';
import { getUsers } from '../helpers/admin/getAllUsers';

import { AdminContextProps } from '../interfaces/context/adminContext';
import { ContextProviderProps } from '../interfaces/context/contextProvider';
import { User } from '../interfaces/userContext';

export const AdminContext = createContext({} as AdminContextProps);

export const AdminProvider = ({ children }: ContextProviderProps) => {
  const { isAdmin, isLogged, token } = useContext(UserContext);

  const [users, setUsers] = useState<User[] | null>([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (isAdmin && isLogged) {
      getUsers().then((data) => setUsers(data));
      // getHistoryPayments(token).then((data) => setPayments(data));
    }
  }, [isAdmin, isLogged]);

  const checkProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ checked: true }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token,
      },
    }).then((response) => response.json());
  };
  const uncheckProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ checked: false }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token,
      },
    }).then((response) => response.json());
  };

  return (
    <AdminContext.Provider value={{ users, payments, checkProduct, uncheckProduct }}>
      {children}
    </AdminContext.Provider>
  );
};
