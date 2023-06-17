import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SecTitle from "../../Components/SecTitle";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <section>
      <SecTitle headding="Testimonials" subHeadding="What Our Client Say" />
      <div className="m-10">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center md:m-24 m-10">
                <Rating className="-ml-32"
                  style={{ maxWidth: 30 }}
                  value={review.rating}
                  readOnly
                />
                <p className="text-center text-xl font-semibold text-orange-500">
                  {review.name}
                </p>
                <p className="text-center">{review.details}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
