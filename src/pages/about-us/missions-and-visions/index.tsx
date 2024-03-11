import React, { FC, useState } from "react";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_MISSIONS_AND_VISIONS from "@/gql/queries/missions-and-visions.query";
import { MissionsAndVisionsResponse } from "@/interfaces/missions-and-visions.interface";
import Sections from "../../../components/ui/sections";
import { Config } from "@/constants/config";

export interface MissionsAndVisionsPageProps {
  data: MissionsAndVisionsResponse;
}

const MissionsAndVisionsPage: FC<MissionsAndVisionsPageProps> = ({ data }) => {
  const { t } = useTranslation("common");
  const sections = [
    "missions_and_visions_mission",
    "missions_and_visions_vision",
  ];
  const [active, setActive] = useState<string>("missions_and_visions_mission");
  return (
    <>
      <Head>
        <title>{t("missions_and_visions_page")}</title>
      </Head>
      <main className={"box  mb-20"}>
        <h2 className={"text-40 font-semibold mt-7 sm:mt-16 mb-7 text-hero"}>
          {t("missions_and_visions_page")}
        </h2>
        <Sections
          sections={sections}
          active={active}
          setActive={setActive}
          type={1}
        />
        <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10"}>
          {data.missionsAndVision.data.attributes[
            active === sections[0] ? "missions" : "visions"
          ].map((item) => (
            <div
              className={"bg-[#8CD5A63D] px-5 py-4  rounded-[16px]"}
              key={item.id}
            >
              <h3 className={"text-18 font-semibold mb-5"}>{item.title}</h3>
              <p className={"text-14"}>{item.description}</p>
            </div>
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
    query: GET_MISSIONS_AND_VISIONS,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
    },
  });

  return {
    props: { data },
  };
};
export default MissionsAndVisionsPage;
