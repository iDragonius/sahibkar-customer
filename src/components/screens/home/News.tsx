import React, { FC } from "react";
import { NewsCardProps } from "@/interfaces/news.interface";
import NewsItem from "@/components/ui/NewsItem";

export interface NewsProps {
  data: NewsCardProps[];
}

const News: FC<NewsProps> = ({ data }) => {
  return (
    <div className={"grid gap-4 grid-cols-1 sm:grid-cols-2 nb:grid-cols-3 "}>
      {data.map((newsItem) => (
        <NewsItem data={newsItem} key={newsItem.id} />
      ))}
    </div>
  );
};

export default News;
