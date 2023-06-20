import { Link } from "react-router-dom";
import Cover from "../Shared/Cover";
import MenuItem from "../Shared/MenuItem";

const MenuCategory = ({ item ,title , coverImg}) => {
  return (
    <div className="pb-16">
    {title && <Cover img={coverImg} title={title} />}
      <div className="grid md:grid-cols-2 gap-6 my-8">
        {item.map((item, index) => (
          <MenuItem item={item} key={index} />
        ))}
      </div>
      <div className="text-center">
      {
        title && <Link to={`/order/${title}`} className="btn btn-accent btn-outline border-0 border-b-4 mt-4">Order now</Link>
      }
      </div>
    </div>
  );
};

export default MenuCategory;
