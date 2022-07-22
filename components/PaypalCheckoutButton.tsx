import { PayPalButtons } from '@paypal/react-paypal-js';
import { CartInterface } from 'interfaces/userContext';

interface Props {
  cart: CartInterface[];
  total: number;
}

const PaypalCheckoutButton = ({ cart, total }: Props) => {
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
      }}
      onCancel={() => {
        alert('Ordered canceled');
      }}
      onError={(err) => {
        console.error(err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
