import SecTitle from "../../Components/SecTitle";
import img from "../../assets/home/featured.jpg";

const Fetured = () => {
  return (
    <section className="bg-[url('/src/assets/home/featured.jpg')] bg-fixed bg-no-repeat bg-cover bg-blend-darken">
      <div
        className="w-full h-full flex justify-center items-center 
             bg-gray-600/30 backdrop-brightness-75"
      >
        <div>
          <SecTitle headding={"Fetured Item"} subHeadding={"Check it Out"} />
          <div className="flex justify-center items-center flex-wrap md:flex-nowrap pt-8 pb-20 md:px-32 px-12 text-white">
            <div>
              <img src={img} alt="" />
            </div>
            <div className="md:ml-10">
              <p>Aug 10 , 2002</p>
              <p className="uppercase">Wherw Can I get some?</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam eos odit dolorem maiores, molestias dolor voluptate
                nesciunt cupiditate nam suscipit adipisci eius dicta accusantium
                deserunt quisquam a maxime excepturi ex!
              </p>
              <button className="btn btn-accent btn-outline border-0 border-b-4 mt-4">
                Order now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fetured;
