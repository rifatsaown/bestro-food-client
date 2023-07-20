import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMenu = () => {
  const {
    data: menu = [],
    isLoading: loading,
    refetch,
  } = useQuery(["menu"], async () => {
    const res = await axios.get(
      "https://bistro-boss-server-snowy-three.vercel.app/menu"
    );
    return res.data;
  });
  return [menu, loading, refetch];
};

export default useMenu;
