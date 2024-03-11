import React, { FC } from "react";
import heroImage from "@/assets/home/hero-main.png";
import Image from "next/image";
import Link from "next/link";
import { EllipseIcon } from "@/components/icons";
import { ServerUrl } from "@/constants/server-url";
import { ImageProps } from "@/interfaces/shared.interface";
export interface HeroProps {
  title: string;
  description: string;
  link: string;
  image: ImageProps;
}

const Hero: FC<HeroProps> = ({ title, description, image, link }) => {
  return (
    <div className={"bg-[#00779F] w-full min-[1000px]:h-[590px] "}>
      <div
        className={
          "box  flex justify-between items-center relative py-20 min-[1000px]:py-0 "
        }
      >
        <div
          className={
            "text-white z-50 min-[1000px]:w-[600px] flex flex-col  min-[1000px]:items-start"
          }
        >
          <h2 className={"leading-[50px] text-32 sm:text-[46px] font-bold "}>
            {title}
          </h2>
          <p
            className={
              "font-medium text-14 sm:text-18 leading-6 mt-6 mb-12  min-[1000px]:text-left"
            }
          >
            {description}
          </p>
          <Link
            href={link}
            className={
              "  leading-6 bg-secondary w-max text-black px-10 py-3 trans hover:ring-4 hover:ring-secondary hover:ring-opacity-70"
            }
          >
            Ətraflı
          </Link>
        </div>
        <div>
          <Image
            src={ServerUrl + image.data.attributes.url}
            alt={"image"}
            width={709}
            height={659}
            className={"min-[1000px]:block hidden h-[590px] object-cover   "}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
