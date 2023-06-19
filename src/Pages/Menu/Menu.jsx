import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover";
import img from "../../assets/menu/banner3.jpg";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={img} title='our menu'/>
    </div>
  );
};

export default Menu;
