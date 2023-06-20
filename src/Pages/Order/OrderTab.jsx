import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import FoodCard from "../../Components/FoodCard";
import "./style.css";

const OrderTab = ({ items }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="grid md:grid-cols-3 gap-10">
            {items.map((item, index) => (
              <FoodCard item={item} key={index} />
            ))}
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default OrderTab;
