import React, { FC } from "react";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import ReactMarkdown from "react-markdown";
import Form from "@/components/screens/training/Form";
import { TrainingResponse } from "@/interfaces/training.interface";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_TRAINING from "@/gql/queries/training.query";
import { Config } from "@/constants/config";

export interface ServicePageProps {
  data: TrainingResponse;
}
const MdxComponents = {
  h3: ({ node, ...props }: { node: unknown }) => (
    <h3
      className={"text-18 sm:text-[22px]  font-semibold  text-secondary mb-8"}
      {...props}
    />
  ),
  p: ({ node, ...props }: { node: unknown }) => (
    <p className={"mb-5  text-16 "} {...props} />
  ),
  li: ({ node, ...props }: { node: unknown }) => (
    <div className={"flex "}>
      <div className={"mr-5 w-4 h-4 bg-heading bg-opacity-40 rounded-full"} />
      <p className={"mb-5  text-18 "} {...props} />
    </div>
  ),
  h4: ({ node, ...props }: { node: unknown }) => (
    <p className={"mb-7  text-18 font-medium "} {...props} />
  ),
};
const ServicePage: FC<ServicePageProps> = ({ data }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{data.training.data.attributes.name}</title>
      </Head>
      <main
        className={
          "box flex flex-col min-[1100px]:flex-row min-[1100px]:justify-between  mt-20 gap-4  mb-20"
        }
      >
        <div className={" min-[1100px]:w-[520px] min-[1100px]:mb-20"}>
          <div className={"flex items-center justify-between gap-3"}>
            <h2 className={" text-[22px] font-medium text-heading"}>
              {data.training.data.attributes.name}
            </h2>
            {data.training.data.attributes.price && (
              <p className={"text-24 font-medium w-full"}>
                {data.training.data.attributes.price + " AZN"}
              </p>
            )}
          </div>
          <div className={"mt-6"}>
            <ReactMarkdown components={MdxComponents}>
              {data.training.data.attributes.mainInfo}
            </ReactMarkdown>
          </div>
          {data.training.data.attributes.hasInfo && (
            <div
              className={
                "py-3 px-5 flex justify-between border border-[#D9D9D9] rounded-[8px] my-8"
              }
            >
              <Section
                label={t("duration")}
                value={data.training.data.attributes.duration}
              />
              <Section
                label={t("lessons")}
                value={
                  data.training.data.attributes.lessonsCount + " " + t("lesson")
                }
              />
              <Section
                label={t("participants")}
                value={
                  data.training.data.attributes.participants +
                  " " +
                  t("participant")
                }
              />
            </div>
          )}
          <div>
            <ReactMarkdown components={MdxComponents}>
              {data.training.data.attributes.additionalInfo}
            </ReactMarkdown>
          </div>
        </div>
        <Form
          image={data.training.data.attributes.image}
          training={data.training.data.attributes.name}
        />
      </main>
    </>
  );
};

const Section = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <h4 className={"text-hover mb-2 font-medium"}>{label}</h4>
      <p>{value}</p>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, query } = context;
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_TRAINING,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
      id: query.id,
    },
  });

  return {
    props: { data },
  };
};
export default ServicePage;
