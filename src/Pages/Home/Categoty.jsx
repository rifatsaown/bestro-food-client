import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import img1 from "../../assets/home/slide1.jpg";
import img2 from "../../assets/home/slide2.jpg";
import img3 from "../../assets/home/slide3.jpg";
import img4 from "../../assets/home/slide4.jpg";
import img5 from "../../assets/home/slide5.jpg";
import SecTitle from "../../Components/SecTitle";

const Categoty = () => {
  return (
    <section>
      <SecTitle headding={'Order Online'} subHeadding={'From 11.00am to 10.00pm'}/>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide>
          <img src={img1} alt="" />
          <h1 className="text-4xl text-center text-white -mt-16 pb-7">Salad</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
          <h3 className="text-4xl text-center text-white -mt-16 pb-7">Pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
          <h1 className="text-4xl text-center text-white -mt-16 pb-7">
            Coffee
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
          <h1 className="text-4xl text-center text-white -mt-16 pb-7">
            Desert
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
          <h1 className="text-4xl text-center text-white -mt-16 pb-7">Salad</h1>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Categoty;
