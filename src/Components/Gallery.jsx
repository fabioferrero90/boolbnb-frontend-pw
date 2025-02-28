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
        <SwiperSlide>
          <img src={house.cover_image} alt={house.name} />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={gallery.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {gallery &&
          gallery.map((image) => (
            <SwiperSlide key={image.id}>
              <img src={image.photo_url} alt={image.house_id} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
