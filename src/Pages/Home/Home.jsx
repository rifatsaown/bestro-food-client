import Banner from "./Banner";
import Categoty from "./Categoty";
import Fetured from "./Fetured";
import PopularMenu from "./PopularMenu";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categoty></Categoty>    
            <PopularMenu/>  
            <Fetured/>
            <Testimonial/>
        </div>
    );
};

export default Home;