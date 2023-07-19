import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

export default function PaymentForm() {
  const elements = useElements();
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardNumberElement);
    console.log(card);
    if (card == null) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (payload.error) {
      console.log('[error]', payload.error);
      setErrorMessage(payload.error.message);
      setPaymentMethod(null);
    } else {
      console.log('[PaymentMethod]', payload.paymentMethod);
      setPaymentMethod(payload.paymentMethod);
      setErrorMessage(null);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className=" bg-base-300 md:py-14 py-5 px-5 md:px-14 rounded-xl space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block mb-1 font-medium">
            Card Number
          </label>
          <CardNumberElement
            className="input w-full pt-3"
            id="cardNumber"
            options={ELEMENT_OPTIONS}
          />
        </div>
        <div>
          <label htmlFor="cardName" className="block mb-1 font-medium">
            Card Holder
          </label>
          <input
            className="input w-full"
            placeholder={"Your Name"}
            name="cardHolder"
          />
        </div>

        <div className="flex gap-2 justify-between">
          <div className="w-3/5">
            <label htmlFor="cardMonth" className="block mb-1 font-medium">
              Expiration Date
            </label>
            <div className="flex">
              <CardExpiryElement
                className="input w-2/6 pt-3"
                options={ELEMENT_OPTIONS}
              />
            </div>
          </div>
          <div className="w-2/5">
            <label htmlFor="cardCvv" className="block mb-1 font-medium">
              CVV
            </label>
            <CardCvcElement
              className="input w-full pt-3"
              options={ELEMENT_OPTIONS}
            />
          </div>
        </div>
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      {paymentMethod && <div>Got PaymentMethod: {paymentMethod.id}</div>}

        <input
          type="submit"
          disabled={!stripe}
          value="pay now"
          className="text-center btn w-full btn-outline"
        />
      </form>
    </div>
  );
}
