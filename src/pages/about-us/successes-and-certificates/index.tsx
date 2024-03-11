import React, { FC } from "react";
import Head from "next/head";
import { SuccessesAndCertificatesResponse } from "@/interfaces/successes-and-certificates.interface";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_SUCCESSES_AND_CERTIFICATES from "@/gql/queries/successes-and-certificates.query";
import useTranslation from "next-translate/useTranslation";
import Item from "@/components/screens/successes-and-certificates/Item";
import { Config } from "@/constants/config";

export interface SuccessesAndCertificatesPageProps {
  data: SuccessesAndCertificatesResponse;
}

const SuccessesAndCertificatesPage: FC<SuccessesAndCertificatesPageProps> = ({
  data,
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("successes_and_certificates_page")}</title>
      </Head>
      <main className={"box  mb-20"}>
        <h2 className={"text-40 font-semibold mt-7 sm:mt-16 mb-7 text-hero"}>
          {t("successes_and_certificates_page")}
        </h2>
        <div className={"grid grid-cols-1 sm:grid-cols-2 nb:grid-cols-3 gap-4"}>
          {data.successesAndCertificates.data.map((item) => (
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
    query: GET_SUCCESSES_AND_CERTIFICATES,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
    },
  });

  return {
    props: { data },
  };
};
export default SuccessesAndCertificatesPage;
