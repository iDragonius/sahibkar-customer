import React, { FC } from "react";
import heroImage from "@/assets/home/hero-main.png";
import Image from "next/image";
import Link from "next/link";
import { EllipseIcon } from "@/components/icons";
import { ServerUrl } from "@/constants/server-url";
import { ImageProps } from "@/interfaces/shared.interface";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { HeroCarouselProps } from "@/interfaces/home.interface";
export interface HeroProps {
  data: HeroCarouselProps[];
}

const Hero: FC<HeroProps> = ({ data }) => {
  return (
    <div className={"bg-hero w-full min-[1000px]:h-[590px] "}>
      <div className={"box  relative  "}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {data.map((el, i) => (
            <SwiperSlide key={i}>
              <div
                className={
                  "flex justify-between items-center relative py-20 min-[1000px]:py-0"
                }
              >
                <div
                  className={
                    "text-white z-50 min-[1000px]:w-[600px] flex flex-col  min-[1000px]:items-start"
                  }
                >
                  <h2
                    className={
                      "leading-[50px] text-32 sm:text-[46px] font-bold "
                    }
                  >
                    {el.title}
                  </h2>
                  <p
                    className={
                      "font-medium text-14 sm:text-18 leading-6 mt-6 mb-12  min-[1000px]:text-left"
                    }
                  >
                    {el.description}
                  </p>
                  <Link
                    href={el.link}
                    className={
                      "  text-hero leading-6bg-opacity-70 w-max bg-white  px-10 py-3 trans hover:ring-4 hover:ring-white hover:ring-opacity-70"
                    }
                  >
                    Ətraflı
                  </Link>
                </div>
                {el.image.data && (
                  <div>
                    <Image
                      src={ServerUrl + el.image.data.attributes.url}
                      alt={"image"}
                      width={709}
                      height={659}
                      className={
                        "min-[1000px]:block hidden h-[590px] object-cover   "
                      }
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination"></div>
      </div>
    </div>
  );
};

export default Hero;
