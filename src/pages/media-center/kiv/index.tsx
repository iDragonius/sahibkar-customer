import React, { FC, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { initializeApollo } from "@/gql/apollo-client";
import GET_KIV from "@/gql/queries/kiv.query";
import {
  BrandingItemProps,
  ImageItemProps,
  KivResponse,
  VideoItemProps,
} from "@/interfaces/kiv..interface";
import Sections from "@/components/ui/sections";
import useTranslation from "next-translate/useTranslation";
import { DownloadIcon } from "@/components/icons";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";
import saveFile from "@/utils/save-file";
import Link from "next/link";
import { Config } from "@/constants/config";

export interface KIVPageProps {
  data: KivResponse;
}

const KIVPage: FC<KIVPageProps> = ({ data }) => {
  const sections = ["kiv_branding", "kiv_images", "kiv_videos"];
  const [active, setActive] = useState<string>(sections[0]);
  return (
    <>
      <Head>
        <title>KIVPage</title>
      </Head>
      <main className={"box mb-20"}>
        <Sections
          sections={sections}
          active={active}
          setActive={setActive}
          type={2}
        />
        {active === "kiv_branding" && (
          <Brandings data={data.kiv.data.attributes.brandings} />
        )}
        {active === "kiv_images" && (
          <Images data={data.kiv.data.attributes.images} />
        )}{" "}
        {active === "kiv_videos" && (
          <Videos data={data.kiv.data.attributes.videos} />
        )}
      </main>
    </>
  );
};

const Brandings = ({ data }: { data: BrandingItemProps[] }) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 nb:grid-cols-3 mb:grid-cols-4 mt-12"
      }
    >
      {data.map((branding) => (
        <div
          className="bg-white border border-gray-300 p-5 hover:border-[#27749C] transition-colors duration-300"
          key={branding.id}
        >
          <h3 className="text-[#111827] text-[16px] font-[500] mb-1">
            {branding.name}
          </h3>
          <p className="text-[#6B7280] text-[16px] font-[500] leading-[24px]">
            {branding.description}
          </p>
          <button
            onClick={() =>
              saveFile(branding.file.data.attributes.url, branding.name)
            }
            className={
              " w-full mt-4 border border-gray-400   py-2 text-center trans hover:bg-hover hover:text-white"
            }
          >
            {t("download")}
          </button>
        </div>
      ))}
    </div>
  );
};

const Images = ({ data }: { data: ImageItemProps[] }) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={" grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 grid gap-4 mt-12 "}
    >
      {data.map((image) => (
        <div className={"relative group trans"} key={image.id}>
          <Image
            src={ServerUrl + image.image.data.attributes.url}
            alt={image.image.data.attributes.name}
            width={381}
            height={236}
            className={"w-full"}
          />
          <div
            className={
              "absolute top-0 left-0 group-hover:w-full group-hover:h-full  w-0 h-0 flex items-center justify-center  trans bg-hover"
            }
          >
            <button
              onClick={() =>
                saveFile(
                  image.image.data.attributes.url,
                  image.image.data.attributes.name,
                )
              }
              className={
                "group-hover:block hidden px-5 w-[150px] py-2 rounded-[36px] border border-white text-white trans hover:bg-white hover:text-hover"
              }
            >
              {t("download")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Videos = ({ data }: { data: VideoItemProps[] }) => {
  const { t } = useTranslation("common");

  return (
    <div
      className={" grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 grid gap-4 mt-12 "}
    >
      {data.map((video) => (
        <div className={"relative group trans"} key={video.id}>
          <Image
            src={ServerUrl + video.thumbnail.data.attributes.url}
            alt={video.thumbnail.data.attributes.name}
            width={381}
            height={236}
            className={"w-full"}
          />
          <div
            className={
              "absolute top-0 left-0 group-hover:w-full group-hover:h-full  w-0 h-0 flex items-center justify-center bg-opacity-50 trans bg-hover"
            }
          >
            <Link
              target={"_blank"}
              href={video.url}
              className={
                "group-hover:block hidden px-5 w-[150px] py-2 rounded-[36px] border border-white text-white trans hover:bg-white hover:text-hover"
              }
            >
              Videoya bax
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_KIV,
    variables: {
      locale: Config.multiLanguage ? locale : "az",
    },
  });

  return {
    props: { data },
  };
};
export default KIVPage;
