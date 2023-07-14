import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SecTitle from "../../Components/SecTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Key;

const AddItem = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit ,reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const fromData = new FormData();
    fromData.append("image", data.image[0]);
    // image Upload to imgbb
    Axios.post(img_hosting_url, fromData).then((res) => {
      if (res.data.status === 200) {
        const itemData = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url,
        };
        // add item to database
        axiosSecure
          .post("/menu", itemData)
          .then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                icon: "success",
                title: "Item Added Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: { err } || "Something went wrong!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Add Item</title>
      </Helmet>
      <div className="w-full px-4  pb-10 ">
        <SecTitle headding="Add an item" subHeadding="What's New" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-200 p-8 rounded-xl"
        >
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Recipe Name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="flex my-4">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="Pick One"
                {...register("category", { required: true })}
                className="select select-bordered"
              >
                <option disabled>Pick One</option>
                <option>pizza</option>
                <option>soup</option>
                <option>salad</option>
                <option>dessert</option>
                <option>desi</option>
                <option>drinks</option>
              </select>
            </div>
            <div className="form-control w-full ml-4">
              <label className="label">
                <span className="label-text font-semibold">Price*</span>
              </label>
              <input
                type="text"
                {...register("price", { required: true })}
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Details"
            ></textarea>
          </div>
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Item Image*</span>
            </label>
            <input
              //only image type file upload
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full "
            />
          </div>
          <input
            className="btn btn-sm btn-accent mt-4"
            type="submit"
            value="Add Item"
          />
        </form>
      </div>
    </>
  );
};

export default AddItem;
