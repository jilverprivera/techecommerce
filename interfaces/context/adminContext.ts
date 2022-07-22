import { User } from '../userContext';

export type AdminContextProps = {
  users: User[] | null;
  payments: any[];
  checkProduct: (id: string) => void;
  uncheckProduct: (id: string) => void;
};
