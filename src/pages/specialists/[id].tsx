import React, { FC } from "react";
import Head from "next/head";
import { SpecialistResponse } from "@/interfaces/specialist.interface";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_TRAINING from "@/gql/queries/training.query";
import { Config } from "@/constants/config";
import GET_SPECIALIST from "@/gql/queries/specialist.query";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";
import ReactMarkdown from "react-markdown";
import Item from "@/components/screens/specialists/Item";

export interface SpecialistPageProps {
  data: SpecialistResponse;
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
const SpecialistPage: FC<SpecialistPageProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <Head>
        <title>{data.specialist.data.attributes.fullName}</title>
      </Head>
      <main>
        <div className={"bg-gray-50 py-5"}>
          <div className={"box flex gap-8"}>
            <div className={"border bg-white min-w-[320px] h-max"}>
              <Image
                src={
                  ServerUrl +
                  data.specialist.data.attributes.image.data.attributes.url
                }
                alt={data.specialist.data.attributes.fullName}
                width={320}
                height={320}
                className={"w-80 h-60 object-contain "}
              />
            </div>
            <div>
              <h1 className={"text-28 font-semibold text-hero mb-4"}>
                {data.specialist.data.attributes.fullName}
              </h1>
              <ReactMarkdown components={MdxComponents}>
                {data.specialist.data.attributes.description || ""}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <div className={"box mt-32"}>
          <h2 className={"text-24 mb-6 font-semibold"}>Digər mütəxəssislər</h2>
          <div
            className={"grid grid-cols-1 sm:grid-cols-2 nb:grid-cols-3 gap-4"}
          >
            {data.specialists.data.map((specialist) => (
              <Item data={specialist} key={specialist.id} />
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
    query: GET_SPECIALIST,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
      id: query.id,
    },
  });

  return {
    props: { data },
  };
};
export default SpecialistPage;
