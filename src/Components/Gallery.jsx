import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { useParams } from "react-router-dom";

const Gallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { gallery, fetchGallery, house } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    fetchGallery(id);
  }, [id]);

  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 md:mb-6"
      >
        <SwiperSlide key={`house-slide-${house.id}`}>
          <img
            src={house.cover_image}
            alt={house.name}
            className="rounded img-gallery p-4"
          />
        </SwiperSlide>
        {gallery &&
          gallery.map((image, index) => (
            <SwiperSlide key={`gallery-slide-${image.id}-${index}`}>
              <img
                src={image.photo_url}
                alt={image.house_id}
                className="rounded img-gallery"
              />
            </SwiperSlide>
          ))}
        <div className="swiper-button-next arrow-nav"></div>
        <div className="swiper-button-prev arrow-nav"></div>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper rounded hidden md:block"
      >
        <SwiperSlide key={`thumb-house-${house.id}`}>
          <div className="">
            <img
              src={house.cover_image}
              alt={house.name}
              className="images-g hidden md:block"
            />
          </div>
        </SwiperSlide>
        {gallery &&
          gallery.map((image, index) => (
            <SwiperSlide key={`thumb-gallery-${image.id}-${index}`}>
              <div className="relative">
                <img
                  src={image.photo_url}
                  alt={image.house_id}
                  className="images-g hidden md:block"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
