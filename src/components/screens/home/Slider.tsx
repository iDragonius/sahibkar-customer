import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";
import { PartnerItemProps } from "@/interfaces/home.interface";

export interface SliderProps {
  data: PartnerItemProps[];
}

const Slider: FC<SliderProps> = ({ data }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        1100: {
          slidesPerView: 4,
        },
        900: {
          slidesPerView: 3,
        },
        480: {
          slidesPerView: 2,
        },
      }}
    >
      {data.map((partner, i) => (
        <SwiperSlide key={partner.id}>
          <Image
            src={ServerUrl + partner.attributes.logo.data.attributes.url}
            alt={partner.attributes.logo.data.attributes.name}
            width={partner.attributes.logo.data.attributes.width}
            height={partner.attributes.logo.data.attributes.height}
            className={"w-full"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
