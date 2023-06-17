import { useEffect, useState } from "react";
import SecTitle from "../../Components/SecTitle";
import MenuItem from "../Shared/MenuItem";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularMenu = data.filter((item) => item.category === 'popular');
        setMenu(popularMenu);
      });
  }, []);

  return (
    <section className="my-10 px-3 ">
      <SecTitle subHeadding="Popular Menu" headding="From our menu" />
      <div className="grid md:grid-cols-2 gap-6">
        {
          menu.map((item , index) => (<MenuItem item={item} key={index}/>))
        }
      </div>
    </section>
  );
};

export default PopularMenu;
