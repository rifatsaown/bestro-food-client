import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../Hooks/useCart.jsx";
import PaymentForm from "./PaymentForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const { cart , refetch } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  const price = parseFloat(total);

  return (
    <div className="max-w-2xl w-full">
      <Elements stripe={stripePromise}>
        <PaymentForm cart={cart} refetch={refetch} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
