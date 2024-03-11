import React, { FC } from "react";
import { AnnouncementItemProps } from "@/interfaces/home.interface";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";
import useTranslation from "next-translate/useTranslation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
export interface AnnouncementsProps {
  data: AnnouncementItemProps[];
}

const Announcements: FC<AnnouncementsProps> = ({ data }) => {
  const { t } = useTranslation("common");
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
        1000: {
          slidesPerView: 2,
        },
      }}
    >
      {data.map((ann) => (
        <SwiperSlide key={ann.id}>
          <Link
            href={`/our-services/seminars/${
              ann.training.data ? ann.training.data.id : 0
            }`}
            className={"relative"}
            key={ann.id}
          >
            <Image
              src={ServerUrl + ann.image.data.attributes.url}
              alt={ann.image.data.attributes.name}
              width={600}
              height={600}
              className={"w-full"}
            />
            <div className={"absolute w-full h-full top-0 left-0  "}>
              <div
                className={
                  "flex flex-col  justify-end min-[550px]:justify-between py-8 px-6 h-full "
                }
              >
                <div className={" flex-col gap-4 min-[550px]:flex hidden "}>
                  {ann.isFree ? (
                    <p
                      className={
                        "text-white bg-[#C10000] inline p-4 rounded-[60px]  w-max"
                      }
                    >
                      {t("free")}
                    </p>
                  ) : (
                    <p
                      className={
                        "text-[#0D1A24] bg-white inline p-4 rounded-[60px]  w-max "
                      }
                    >
                      {t("paid")}
                    </p>
                  )}
                  <p
                    className={
                      "text-[#0D1A24] bg-white inline p-4 rounded-[60px]  w-max"
                    }
                  >
                    {ann.time}
                  </p>
                </div>
                <div>
                  <p className={"text-white  text-14 tb:text-16 font-medium"}>
                    {ann.certificateType}
                  </p>
                  <h2
                    className={
                      "text-white text-20 tb:text-24 leading-8 font-bold min-[550px]:mb-8"
                    }
                  >
                    {ann.name}
                  </h2>
                  <div className={" justify-between  min-[550px]:flex hidden"}>
                    <div>
                      <p
                        className={"text-white text-14 tb:text-16 font-medium"}
                      >
                        {t("trainer")}
                      </p>
                      <h3 className={"text-white text-18 tb:text-20 leading-8"}>
                        {ann.trainer}
                      </h3>
                    </div>{" "}
                    <div>
                      <p
                        className={
                          "text-white   text-14 tb:text-16 font-medium"
                        }
                      >
                        {t("address")}
                      </p>
                      <h3 className={"text-white text-18 tb:text-20 leading-8"}>
                        {ann.address}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Announcements;
