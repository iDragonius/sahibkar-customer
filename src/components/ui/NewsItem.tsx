import React, { FC } from "react";
import { NewsCardProps } from "@/interfaces/news.interface";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export interface NewsItemProps {
  data: NewsCardProps;
}

const NewsItem: FC<NewsItemProps> = ({ data }) => {
  const { t } = useTranslation("common");
  const getType = (type: string) => {
    if (type === "news") {
      return t("news");
    } else if (type === "blog") {
      return t("blog");
    }
  };
  return (
    <Link
      href={`/media-center/news/${data.id}`}
      className={"h-full border border-[#B7B7B7] trans hover:border-hover"}
    >
      <Image
        src={ServerUrl + data.attributes.thumbnail.data.attributes.url}
        alt={data.attributes.thumbnail.data.attributes.name}
        width={383}
        height={219}
        className={"w-full h-[240px] object-cover "}
      />
      <div className={"flex flex-col justify-between h-[calc(100%-240px)]"}>
        <div className={"px-4 pt-4 "}>
          <h3 className={"text-hover text-18 font-medium mb-5 line-clamp-3"}>
            {data.attributes.title}
          </h3>
          <p className={"line-clamp-3 text-14 text-[#818181]"}>
            {data.attributes.shortDescription}
          </p>
        </div>
        <div
          className={
            "w-full flex justify-between px-4 pb-3 pt-4  items-center text-[12px] "
          }
        >
          <p className={"bg-[#EEEBEB] text-[#060505] p-[6px] "}>
            {getType(data.attributes.type)}
          </p>
          <p>{dayjs(data.attributes.date).format("DD.MM.YYYY")}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsItem;
