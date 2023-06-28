const FoodCard = ({item}) => {
    const { name, price, image, recipe } = item;
    
    const handleAddToCart = (item) => {
        console.log(item);
    }

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src={image}
            alt="Shoes"
          />
        </figure>
        <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-2 px-4 py-2 rounded-lg">${price}</p>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button onClick={()=> handleAddToCart(item)} className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
