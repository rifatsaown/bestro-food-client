const MenuItem = ({ item }) => {
  const { name, price, image, recipe } = item;
  return (
    <div className="flex space-x-2 items-center">
      <img className="rounded-full w-24 h-24" src={image} alt="" />
      <div>
        <h3 className="uppercase text-lg">{name}--------------</h3>
        <p>{recipe}</p>
      </div>
      <p>
        <span className="text-xl text-accent font-bold">${price}</span>
      </p>
    </div>
  );
};

export default MenuItem;
