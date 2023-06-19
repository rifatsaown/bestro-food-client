import { Helmet } from "react-helmet-async";
import SecTitle from "../../Components/SecTitle";
import useMenu from "../../Hooks/useMenu";
import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import Cover from "../Shared/Cover";
import MenuCategory from "./MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="our menu" />
      <SecTitle headding={"Todays Offer"} subHeadding={"Don't Miss"} />
      {/* Offered */}
      <MenuCategory item={offered} />
      {/* dessert */}
      <MenuCategory item={dessert} title="Dessert" coverImg={dessertImg} />
      <MenuCategory item={pizza} title="Pizza" coverImg={pizzaImg} />
      <MenuCategory item={salad} title="Salad" coverImg={saladImg} />
      <MenuCategory item={soup} title="Soup" coverImg={soupImg} />
    </div>
  );
};

export default Menu;
