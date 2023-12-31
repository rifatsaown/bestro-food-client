import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

// This hook is used to fetch the cart items of the user from the server and return the cart items and refetch function
// This hooks is created with the help of tanstack/react-query

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (user) {
        // call this after 1 second
        const res = await axiosSecure(
          `https://bestro-food-ts-server.onrender.com/carts?email=${user?.email}`
        );
        return res.data;
      }
      return [];
    },
  });
  return { cart, refetch };
};

export default useCart;
