import { AlertTypes } from 'interfaces/frontend/alerts';

export type LayoutContextProps = {
  gridView: Grid;
  alert: boolean;
  alertMessage: string;
  alertType: AlertTypes | null;
  activateAlert: (arg: string, type: AlertTypes) => void;
};

interface Grid {
  isGrid: boolean;
  setIsGrid: (arg: boolean) => void;
}
