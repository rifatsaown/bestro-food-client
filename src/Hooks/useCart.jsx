import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

// This hook is used to fetch the cart items of the user from the server and return the cart items and refetch function
// This hooks is created with the help of tanstack/react-query

const useCart = () => {
  const { user } = useContext(AuthContext);
  
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/carts?email=${user?.email}`
      );
      return res.json();
    },
  });
  return {cart, refetch}
};

export default useCart;
