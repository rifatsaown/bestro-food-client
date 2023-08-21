import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/payments/${user.email}`).then((res) => {
      setPayments(res.data);
    });
  }, [axiosSecure, user.email]);

  return (
    <>
      {payments.length == 0 ? <h1 className="text-3xl font-semibold">No Payment History</h1> : <div className="py-8 mx-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg mb-2">
              <span className="font-semibold">Trx ID:</span> {payment.trxId}
              </h3>
              <p className="mb-2"><span className="font-semibold">Date:</span> {payment.date}</p>
              <p className="mb-2"><span className="font-semibold">Order Status: </span> {payment.orderStatus}</p>
              <p className="mb-2"><span className="font-semibold">Total Products: </span>{payment.quantity}</p>
              <p className="mb-2"><span className="font-semibold">Products:</span></p>
              <ul className="list-disc pl-6">
                {payment.itemsName.map((itemName) => (
                  <li key={itemName}>{itemName}</li>
                ))}
              </ul>
              <p className="mt-4 font-bold">Total Price: ${payment.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>}
    </>
  );
};

export default PaymentHistory;
