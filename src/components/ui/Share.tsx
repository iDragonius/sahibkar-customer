import React, { FC, useRef } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon, LinkIcon } from "@/components/icons/links";
import { useRouter } from "next/router";
import { ClientUrl } from "@/constants/client-url";
import clsx from "clsx";

export interface ShareProps {}

const Share: FC<ShareProps> = () => {
  const { t } = useTranslation("common");
  const { locale, asPath } = useRouter();
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={
        "w-full border-[#AEAEAE] border rounded-[8px] flex flex-col items-center py-1"
      }
    >
      <p className={"text-16 text-hover mb-2"}>{t("share")}</p>
      <div className={"flex flex-col gap-3 pb-2"}>
        <Link
          href={
            `https://www.facebook.com/sharer/sharer.php?u=` +
            ClientUrl +
            "/" +
            locale +
            asPath
          }
          target={"_blank"}
          className={
            "h-8 w-8 bg-hover rounded-full flex items-center justify-center trans hover:ring-4 hover:ring-opacity-40 hover:ring-hover"
          }
        >
          <FacebookIcon />
        </Link>{" "}
        <Link
          href={
            `https://www.facebook.com/sharer/sharer.php?u=` +
            ClientUrl +
            "/" +
            locale +
            asPath
          }
          target={"_blank"}
          className={
            "h-8 w-8 bg-hover rounded-full flex items-center justify-center trans hover:ring-4 hover:ring-opacity-40 hover:ring-hover"
          }
        >
          <LinkedinIcon />
        </Link>
        <div
          className={" group relative"}
          onClick={() => {
            navigator.clipboard.writeText(ClientUrl + "/" + locale + asPath);

            if (tooltipRef.current) {
              tooltipRef.current.classList.toggle("hidden");
            }
            setTimeout(() => {
              if (tooltipRef.current) {
                tooltipRef.current.classList.toggle("hidden");
              }
            }, 1000);
          }}
        >
          <div
            className={clsx(
              "w-8 h-8 flex items-center justify-center bg-[#27749C] group-hover:ring-4 group-hover:ring-opacity-40 group-hover:ring-[#27749C]   transition-all ease-in-out min-w-6 min-h-6 rounded-full cursor-pointer ",
            )}
          >
            <LinkIcon />
          </div>
          <div
            role={"tooltip"}
            ref={tooltipRef}
            className={
              "px-3 py-2 bg-gray-800 text-white absolute text-[12px] rounded-lg w-max top-2 left-6 hidden  transition-all ease-in-out "
            }
          >
            Copied!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
