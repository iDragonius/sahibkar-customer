import React, { FC } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useTranslation from "next-translate/useTranslation";
import { PrevArrowIcon } from "@/components/icons";
import { SpecialistItemProps } from "@/interfaces/specialists.interface";
import Item from "@/components/screens/specialists/Item";
export interface SpecialistsProps {
  data: SpecialistItemProps[];
}

const Specialists: FC<SpecialistsProps> = ({ data }) => {
  const { t } = useTranslation("common");
  const swiperRef = React.useRef<null | SwiperRef>(null);
  const nextSlide = () => {
    swiperRef.current!.swiper.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current!.swiper.slidePrev();
  };
  return (
    <>
      <div className={"flex justify-between items-center"}>
        <h2 className={"text-28 font-bold mb-3 text-heading"}>
          {t("specialists_page")}
        </h2>
        <div
          className={
            "w-20 flex justify-between border border-[#DADADA] rounded-[4px] h-10 items-center"
          }
        >
          <div onClick={prevSlide} className={"ml-3 cursor-pointer"}>
            <PrevArrowIcon />
          </div>
          <div className={"w-[1px] h-8 bg-[#DADADA]"} />
          <div onClick={nextSlide} className={"mr-3 cursor-pointer"}>
            <PrevArrowIcon className={"rotate-180"} />
          </div>
        </div>
      </div>

      <p className={"mb-8 text-20"}>
        Biliklərinizi akademik səviyyəyə çatdırmaq üçün seçdiyimiz
        mütəxəssisləri Siz də tanıyın.
      </p>
      <Swiper
        ref={swiperRef}
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
          640: {
            slidesPerView: 2,
          },
        }}
      >
        {data.map((specialist) => (
          <SwiperSlide key={specialist.id}>
            <Item data={specialist} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Specialists;
