import React, { FC } from "react";
import Head from "next/head";
import Hero from "@/components/screens/home/hero";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_HOME from "@/gql/queries/home.query";
import { HomeResponse } from "@/interfaces/home.interface";
import useTranslation from "next-translate/useTranslation";
import Slider from "@/components/screens/home/Slider";
import VideoBanner from "@/components/screens/home/VideoBanner";
import News from "@/components/screens/home/News";
import Link from "next/link";
import Opportunities from "@/components/screens/home/Opportunities";
import Info from "@/components/screens/home/info";
import { useWindowSize } from "usehooks-ts";
import clsx from "clsx";
import Trainings from "@/components/screens/home/Trainings";
import Announcements from "@/components/screens/home/Announcements";
import EmailSubscription from "@/components/screens/home/EmailSubscription";
import Item from "@/components/screens/specialists/Item";
import { Config } from "@/constants/config";
import Specialists from "@/components/screens/home/Specialists";

export interface HomePageProps {
  data: HomeResponse;
}

const HomePage: FC<HomePageProps> = ({ data }) => {
  const { t } = useTranslation("common");
  const { width } = useWindowSize();
  return (
    <>
      <Head>
        <title>Sahibkar Akademiyası</title>
      </Head>
      <main className={" mb-20"}>
        <Hero data={data.homePage.data.attributes.hero} />
        <div className={"flex sm:flex-col flex-col-reverse sm:mt-10"}>
          <div className={"box"}>
            <h2 className={"mb-10 text-20 "}>
              Sahibkarlıq bir rəqəmlər toplusudur. Fəaliyyətimizi bir də
              rəqəmlərlə görün.
            </h2>
          </div>
          <div
            className={clsx(
              " sm:mb-[50px] nb:mb-[100px] mb-6",
              width > 640 && "box",
            )}
          >
            <Info data={data.homePage.data.attributes.infos} />
          </div>
        </div>

        <div className={"box  mb-16"}>
          <h2 className={"mb-8 text-28 font-bold  text-heading"}>
            {t("opportunities")}
          </h2>
          <div className={"min-[1100px]:px-20"}>
            <Opportunities data={data.homePage.data.attributes.opportunities} />
          </div>
        </div>
        <div className={"box mb-16"}>
          <h2 className={"text-28 font-bold mb-3 text-heading"}>
            {t("announcements")}
          </h2>
          <p className={"mb-8 text-20"}>
            Verdiyimiz hər bir elan inkişafınız üçün atmaq istədiyimiz yeni bir
            mərhələdir.
          </p>
          <Announcements data={data.homePage.data.attributes.announcements} />
        </div>
        <div className={"box mb-16"}>
          <Trainings data={data.homePage.data.attributes.trainings.data} />
        </div>
        <div className={"box mb-16"}>
          <Specialists data={data.specialists.data} />
        </div>
        <div className={"box"}>
          <div className={"flex justify-between mb-4 "}>
            <h2 className={"text-28 font-bold  text-heading"}>
              {t("news_and_blogs")}
            </h2>

            <Link
              href={"/media-center/news"}
              className={
                "text-14 px-3 py-[10px] border border-[#838383] rounded-[12px] trans hover:bg-[#838383] hover:text-white"
              }
            >
              {t("show_all")}
            </Link>
          </div>
          <p className={"mb-8 text-20"}>
            Elm, təhsil və akademiyanın fəaliyyəti ilə bağlı yenilənən xəbərləri
            buradan oxuyun.
          </p>
          <News data={data.newss.data} />
        </div>
        <div className={"box mt-12"}>
          <h2 className={"mb-3 text-28 font-bold text-heading"}>
            {t("customers")}
          </h2>
          <p className={"mb-8 text-20"}>
            Fəaliyyətləri fərqli olsa da, akademik olmaq üçün bizi seçənlər var.
          </p>
          <div className={" px-6 sm:px-20"}>
            <Slider data={data.customers.data} />
          </div>
        </div>
        <div className={"box my-20"}>
          <VideoBanner
            title={data.homePage.data.attributes.videoBannerTitle}
            description={data.homePage.data.attributes.videoBannerDescription}
            url={data.homePage.data.attributes.videoBannerUrl}
            image={data.homePage.data.attributes.videoBannerThumbnail}
          />
        </div>
        <div className={"box mt-12"}>
          <h2 className={"mb-3 text-28 font-bold  text-heading"}>
            {t("partners")}
          </h2>
          <p className={"mb-8 text-20"}>
            Fəaliyyətləri fərqli olsa da, akademik olmaq üçün bizi seçənlər var.
          </p>
          <div className={"sm:px-20"}>
            <Slider data={data.partners.data} />
          </div>
        </div>
        {/*<div className={"mt-20 box"}>*/}
        {/*  <EmailSubscription />*/}
        {/*</div>*/}
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, query } = context;
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_HOME,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
    },
  });

  return {
    props: { data },
  };
};
export default HomePage;
