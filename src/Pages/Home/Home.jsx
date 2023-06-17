import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Categoty from "./Categoty";
import Fetured from "./Fetured";
import PopularMenu from "./PopularMenu";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner></Banner>
      <Categoty></Categoty>
      <PopularMenu />
      <Fetured />
      <Testimonial />
    </div>
  );
};

export default Home;
