import React, { FC } from "react";
import { ImageProps } from "@/interfaces/shared.interface";
import bg from "@/assets/video-frame.jpg";
import useTranslation from "next-translate/useTranslation";
import { ServerUrl } from "@/constants/server-url";
import Image from "next/image";
import Link from "next/link";
import { VideoIcon } from "@/components/icons";
export interface VideoBannerProps {
  title: string;
  description: string;
  url: string;
  image: ImageProps;
}

const VideoBanner: FC<VideoBannerProps> = ({
  image,
  description,
  title,
  url,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className={"grid grid-cols-1 mb:grid-cols-2 mt-[50px]"}>
      <div
        className={"flex py-10 flex-col justify-center px-[50px]"}
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div>
          <p className={"text-[20px] lg:text-2xl text-white mb-5"}>{title}</p>
          <p
            className={
              " text-[12px] mb:text-base text-[#F9F9F9] pl-[10px] border-l-2 border-[#ff]"
            }
          >
            {description}
          </p>
        </div>
      </div>
      <div className={"relative"}>
        <Image
          src={ServerUrl + image.data.attributes.url}
          alt={image.data.attributes.name}
          width={image.data.attributes.width}
          height={image.data.attributes.height}
          className={"h-full w-full"}
        />
        <Link
          href={url}
          target={"_blank"}
          className={
            "h-[50px] w-[235px] absolute right-0 bottom-0 flex justify-center items-center bg-[#F05236]"
          }
        >
          <VideoIcon />
          <p className={"text-base font-medium text-white ml-3"}>
            {t("watch_video")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default VideoBanner;
