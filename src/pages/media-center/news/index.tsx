import React, { FC } from "react";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_NEWS from "@/gql/queries/news.query";
import { NewsCardProps, NewsResponse } from "@/interfaces/news.interface";
import NewsItem from "@/components/ui/NewsItem";
import { Config } from "@/constants/config";
import { usePagination } from "@/hooks/usePagination";

export interface NewsPageProps {
  data: NewsResponse;
}

const NewsPage: FC<NewsPageProps> = ({ data }) => {
  const { t } = useTranslation("common");
  const { items, page, prevPage, nextPage } = usePagination<NewsCardProps[]>(
    data.newss.data,
    1,
    6,
  );
  console.log(data);
  return (
    <>
      <Head>
        <title>{t("news_page")}</title>
      </Head>
      <main className={"box  mb-20"}>
        <h2 className={"text-40 font-semibold mt-7 sm:mt-16 mb-7 text-hero"}>
          {t("news_page")}
        </h2>
        <div className={"grid grid-cols-1 sm:grid-cols-2 nb:grid-cols-3 gap-4"}>
          {items.map((news) => (
            <NewsItem data={news} key={news.id} />
          ))}
        </div>
        <div className={"flex items-center justify-center mx-auto mt-20"}>
          <div
            className={
              "flex border border-[#CDCDCD] py-2 px-3 gap-2 items-center"
            }
          >
            <div
              className={
                "flex items-center gap-1 bg-[#EEEBEB] p-[6px] cursor-pointer"
              }
              onClick={prevPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.25 10L12.5 3.75L13.375 4.625L8 10L13.375 15.375L12.5 16.25L6.25 10Z"
                  fill="#939393"
                />
              </svg>
              <span className={"text-[#939393] text-[12px]"}>Əvvəlki</span>
            </div>
            <span
              className={
                "h-8 w-8 flex items-center justify-center font-semibold text-hover"
              }
            >
              {page}
            </span>
            <div
              className={
                "flex items-center gap-1 bg-[#EEEBEB] p-[6px] cursor-pointer"
              }
              onClick={nextPage}
            >
              <span className={"text-[#939393] text-[12px]"}>Növbəti</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M13.75 10L7.5 16.25L6.625 15.375L12 10L6.625 4.625L7.5 3.75L13.75 10Z"
                  fill="#939393"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_NEWS,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
      pageSize: 10000,
      page: 1,
    },
  });

  return {
    props: { data },
  };
};
export default NewsPage;
