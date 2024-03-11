import React, { FC } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_NEWS_ITEM from "@/gql/queries/news-item.query";
import { NewsItemResponse } from "@/interfaces/news-item.interface";
import useTranslation from "next-translate/useTranslation";
import NewsItem from "@/components/ui/NewsItem";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import Share from "@/components/ui/Share";
import ImageContainer from "@/components/screens/news/ImageContainer";
import { Config } from "@/constants/config";

export interface NewsItemPageProps {
  data: NewsItemResponse;
}
const MdxComponents = {
  p: ({ node, ...props }: { node: unknown }) => (
    <p className={"mb-2  text-16 "} {...props} />
  ),
};
const NewsItemPage: FC<NewsItemPageProps> = ({ data }) => {
  const { t } = useTranslation("common");
  const getType = (type: string) => {
    if (type === "news") {
      return t("news");
    } else if (type === "blog") {
      return t("blog");
    }
  };
  return (
    <>
      <Head>
        <title>{data.news.data.attributes.title}</title>
      </Head>
      <main className={"box mb-20"}>
        <div className={"flex gap-7  mt-11"}>
          <div
            className={"min-w-[72px] sm:sticky top-[120px] hidden sm:block"}
            style={{
              alignSelf: "flex-start",
            }}
          >
            <Share />
          </div>
          <div className={"sm:w-[calc(100%-100px)] w-full"}>
            <h1 className={"text-hover font-medium text-[22px]"}>
              {data.news.data.attributes.title}
            </h1>
            <div className={"flex gap-2 text-14  text-[#A8A8A8] mt-3"}>
              <p>
                {dayjs(data.news.data.attributes.date).format("DD.MM.YYYY")}
              </p>
              <div />
              <p>{getType(data.news.data.attributes.type)}</p>
            </div>
            <div className={"text-[#8C8C8C] mt-7"}>
              <ReactMarkdown components={MdxComponents}>
                {data.news.data.attributes.content}
              </ReactMarkdown>{" "}
            </div>
            <div className={"mt-10"}>
              <ImageContainer data={data.news.data.attributes.assets.data} />
            </div>
          </div>
        </div>
        <div>
          <h2 className={"mb-7 mt-12 font-medium text-28 "}>
            {t("other_news")}
          </h2>
          <div
            className={"grid grid-cols-1 sm:grid-cols-2 nb:grid-cols-3 gap-4"}
          >
            {data.newss.data.map((newsItem) => (
              <NewsItem data={newsItem} key={newsItem.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, query } = context;
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_NEWS_ITEM,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
      id: query.id,
    },
  });

  return {
    props: { data },
  };
};
export default NewsItemPage;
