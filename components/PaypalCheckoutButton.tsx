import { PayPalButtons } from '@paypal/react-paypal-js';
import { LayoutContext } from 'context/LayoutContext';
import { AlertTypes } from 'interfaces/frontend/alerts';
import { CartInterface } from 'interfaces/userContext';
import { useContext } from 'react';

interface Props {
  cart: CartInterface[];
  total: number;
}

const PaypalCheckoutButton = ({ cart, total }: Props) => {
  const { activateAlert } = useContext(LayoutContext);
  return (
    <PayPalButtons
      style={{
        color: 'blue',
        layout: 'horizontal',
        label: 'checkout',
        height: 48,
        tagline: false,
        shape: 'rect',
      }}
      onClick={(data, actions) => {
        const hasAlreadyBought = false;
        if (hasAlreadyBought) {
          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{ ...cart, amount: { value: String(total) } }],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order?.capture();
        console.log(data);
        console.log(order);
        activateAlert(AlertTypes.SUCCESS, 'Your purchase has been approved succesfully.');
      }}
      onCancel={() => {
        activateAlert(AlertTypes.ERROR, 'Your purchase has been cancel.');
      }}
      onError={(err) => {
        console.error(err);
        activateAlert(AlertTypes.ERROR, 'Something went wrong with your purchase.');
      }}
    />
  );
};

export default PaypalCheckoutButton;
