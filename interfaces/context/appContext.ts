import { CategoryInterface } from '../categories';
import { ProductInterface } from '../products';

export type appContextProps = {
  signInModal: SignInModal;
  signUpModal: SignUpModal;
  products: ProductInterface[];
  categories: CategoryInterface[];
  productSearch: string;
  setProductSearch: (arg: string) => void;
};

interface SignInModal {
  openSignInModal: boolean;
  setOpenSignInModal: (arg: boolean) => void;
}

interface SignUpModal {
  openSignUpModal: boolean;
  setOpenSignUpModal: (arg: boolean) => void;
}
