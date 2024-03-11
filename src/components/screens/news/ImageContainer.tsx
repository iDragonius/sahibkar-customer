import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";

export interface ImageContainerProps {
  data: {
    id: string;
    attributes: {
      width: number;
      height: number;
      name: string;
      url: string;
    };
  }[];
}

const ImageContainer: FC<ImageContainerProps> = ({ data }) => {
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
        900: {
          slidesPerView: 3,
        },
      }}
    >
      {data.map((img, i) => (
        <SwiperSlide key={img.id}>
          <Image
            src={ServerUrl + img.attributes.url}
            alt={img.attributes.name}
            width={332}
            height={236}
            className={"w-full"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageContainer;
