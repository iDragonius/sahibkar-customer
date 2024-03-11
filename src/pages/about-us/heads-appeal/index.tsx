import React, { FC } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_HEADS_APPEAL from "@/gql/queries/heads-appeal.query";
import { HeadsAppealResponse } from "@/interfaces/heads-appeal.interface";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";
import ReactMarkdown from "react-markdown";
import { Config } from "@/constants/config";

export interface HeadsAppealPageProps {
  data: HeadsAppealResponse;
}
const MdxComponents = {
  h3: ({ node, ...props }: { node: unknown }) => (
    <h3
      className={"text-18 sm:text-[22px]  font-semibold  text-[#001C00] mb-8"}
      {...props}
    />
  ),
  p: ({ node, ...props }: { node: unknown }) => (
    <p className={"mb-2  text-16 sm:text-20"} {...props} />
  ),
};
const HeadsAppealPage: FC<HeadsAppealPageProps> = ({ data }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("heads_appeal_page")}</title>
      </Head>
      <main className={"box  mb-20"}>
        <h2
          className={"text-24 min-[400px]:text-28 font-medium my-8 nb:my-12 "}
        >
          {" "}
          {t("heads_appeal_page")}
        </h2>
        <div
          className={
            "bg-[#8CD5A63D] p-4 sm:p-12 rounded-[16px] flex min-[1100px]:flex-row flex-col gap-10"
          }
        >
          <div>
            <ReactMarkdown components={MdxComponents}>
              {data.headsAppeal.data.attributes.content}
            </ReactMarkdown>
          </div>

          <div>
            <Image
              src={
                ServerUrl +
                data.headsAppeal.data.attributes.image.data.attributes.url
              }
              alt={data.headsAppeal.data.attributes.image.data.attributes.name}
              width={427}
              height={304}
              className={
                "sm:min-w-[427px] sm:h-[304px] object-cover rounded-[8px]"
              }
            />
            <h3 className={"text-16 sm:text-20 font-semibold mt-2 mb-1"}>
              {data.headsAppeal.data.attributes.fullName}
            </h3>
            <p className={"text-16 sm:text-20 font-thin"}>
              {data.headsAppeal.data.attributes.position}
            </p>
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
    query: GET_HEADS_APPEAL,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
    },
  });

  return {
    props: { data },
  };
};
export default HeadsAppealPage;
