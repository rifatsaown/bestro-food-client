import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMenu = () => {
  const {
    data: menu = [],
    isLoading: loading,
    refetch,
  } = useQuery(["menu"], async () => {
    const res = await axios.get(
      "https://bestro-food-ts-server.onrender.com/menu"
    );
    return res.data;
  });
  return [menu, loading, refetch];
};

export default useMenu;
