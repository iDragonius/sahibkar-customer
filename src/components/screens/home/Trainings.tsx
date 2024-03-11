import React, { FC } from "react";
import { TrainingItemProps } from "@/interfaces/home.interface";
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
export interface TrainingsProps {
  data: TrainingItemProps[];
}

const Trainings: FC<TrainingsProps> = ({ data }) => {
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
          {t("trainings")}
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
        Sahibkarlıq fəaliyyətinizi yeni mərhələlərə daşıyacaq akademik
        təlimlərimizə yazılın.
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
          1100: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
        }}
      >
        {data.map((training) => (
          <SwiperSlide key={training.id}>
            <div className={"border p-4 border-[#CACACA]"}>
              <div className={"h-[81px]"}>
                <h3 className={"text-18 font-medium "}>
                  {training.attributes.name}
                </h3>
                <p className={"text-14 text-[#898888] mt-1 mb-10"}>
                  {training.attributes.date &&
                    dayjs(training.attributes.date).format("DD.MM.YYYY")}
                </p>
              </div>

              <p className={"line-clamp-2 mb-4"}>
                {training.attributes.mainInfo}
              </p>
              <Link href={`/trainings/${training.id}`} className={"text-hover"}>
                Read more
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Trainings;
