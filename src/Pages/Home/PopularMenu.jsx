import SecTitle from "../../Components/SecTitle";
import useMenu from "../../Hooks/useMenu";
import MenuItem from "../Shared/MenuItem";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section className="my-10 px-3 ">
      <SecTitle subHeadding="Popular Menu" headding="From our menu" />
      <div className="grid md:grid-cols-2 gap-6">
        {popular.map((item, index) => (
          <MenuItem item={item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
