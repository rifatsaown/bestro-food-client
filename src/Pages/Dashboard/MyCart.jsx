import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart";

const MyCart = () => {
  const { cart, refetch } = useCart();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bestro-food-ts-server.onrender.com/carts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("JWT-token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      {cart.status === "error" ? (
        <>
          Please Login Again to see your cart <br />
          -- Your Token has been expired --
        </>
      ) : (
        <>
          <div className="w-full">
            <Helmet>
              <title>Bistro Boss | My Cart</title>
            </Helmet>

            <div className="uppercase text-2xl font-semibold my-4 flex justify-around">
              <h3>Total Item: {cart.length}</h3>
              <h3>
                Total Price: $
                {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
              </h3>
              <Link to="/dashboard/payment" className="btn btn-accent btn-sm">
                Pay
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-base-200">
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={item.image} alt="Food Image" />
                              </div>
                            </div>
                          </td>
                          <td>{item.name}</td>
                          <td>${item.price}</td>
                          <td>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="btn btn-accent text-lg bg-red-700 text-white"
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Item Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyCart;
