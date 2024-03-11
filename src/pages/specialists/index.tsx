import React, { FC } from "react";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_SPECIALISTS from "@/gql/queries/specialists.query";
import { SpecialistsResponse } from "@/interfaces/specialists.interface";
import Item from "@/components/screens/specialists/Item";
import { Config } from "@/constants/config";

export interface SpecialistsPageProps {
  data: SpecialistsResponse;
}

const SpecialistsPage: FC<SpecialistsPageProps> = ({ data }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("specialists_page")}</title>
      </Head>
      <main className={"box  mb-20"}>
        <h2
          className={
            "text-24 min-[400px]:text-28 font-medium my-8 nb:my-12 text-heading"
          }
        >
          {t("specialists_page")}
        </h2>
        <div className={"grid grid-cols-1 sm:grid-cols-2 nb:grid-cols-3 gap-4"}>
          {data.specialists.data.map((item) => (
            <Item data={item} key={item.id} />
          ))}
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_SPECIALISTS,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
    },
  });

  return {
    props: { data },
  };
};
export default SpecialistsPage;
