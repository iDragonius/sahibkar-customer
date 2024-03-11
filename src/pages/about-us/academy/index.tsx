import React, { FC } from "react";
import Head from "next/head";
import { initializeApollo } from "@/gql/apollo-client";
import { GetServerSideProps } from "next";
import GET_ABOUT_US from "@/gql/queries/about-us.query";
import { AboutUsResponse } from "@/interfaces/about-us.interface";
import ReactMarkdown from "react-markdown";
import useTranslation from "next-translate/useTranslation";
import { Config } from "@/constants/config";

export interface AcademyPageProps {
  data: AboutUsResponse;
}
const MdxComponents = {
  h3: ({ node, ...props }: { node: unknown }) => (
    <h3
      className={"text-20 sm:text-28  font-semibold  text-heading2 pt-10 pb-5"}
      {...props}
    />
  ),
  p: ({ node, ...props }: { node: unknown }) => (
    <p className={"mb-2  text-14 sm:text-18"} {...props} />
  ),
};

const AcademyPage: FC<AcademyPageProps> = ({ data }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("academy_page")}</title>
      </Head>
      <main className={"box mb-20"}>
        <h2 className={"text-40 font-semibold mt-7 sm:mt-16 mb-7 text-hero "}>
          {t("academy_title")}
        </h2>
        <div className={"px-10  bg-[#EAF4FF] rounded-[16px] pb-10"}>
          <ReactMarkdown components={MdxComponents}>
            {data?.aboutUs?.data?.attributes?.content}
          </ReactMarkdown>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_ABOUT_US,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
    },
  });

  return {
    props: { data },
  };
};
export default AcademyPage;
