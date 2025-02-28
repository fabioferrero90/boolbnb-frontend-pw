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
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide key={`house-slide-${house.id}`}>
          <img
            src={house.cover_image}
            alt={house.name}
            className="rounded img-gallery"
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
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3 img-scroller rounded"
      >
        <SwiperSlide key={`thumb-house-${house.id}`}>
          <img src={house.cover_image} alt={house.name} className="contain" />
        </SwiperSlide>
        {gallery &&
          gallery.map((image, index) => (
            <SwiperSlide key={`thumb-gallery-${image.id}-${index}`}>
              <div className="img-box">
                <img src={image.photo_url} alt={image.house_id} className="" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
