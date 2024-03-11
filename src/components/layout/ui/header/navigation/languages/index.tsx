import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import useScrollPosition from "@/hooks/useScrollPosition";
import { DropdownIcon } from "@/components/icons";
import { useOnClickOutside } from "usehooks-ts";

export interface LanguagesProps {}

const Languages: FC<LanguagesProps> = () => {
  const { locales, locale } = useRouter();
  const [isOpen, setOpen] = useState<boolean>(false);
  const scrollPosition = useScrollPosition();
  const { pathname, push, query, asPath } = useRouter();
  const popupRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(popupRef, () => setOpen(false));
  return (
    <div className={"relative"}>
      <div
        className={"flex gap-1 items-center cursor-pointer"}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <span
          className={clsx(
            scrollPosition === 0 && pathname === "/"
              ? "text-white"
              : "text-black",
            "text-18 font-medium",
          )}
        >
          {locale?.toUpperCase()}
        </span>

        <DropdownIcon
          className={clsx(
            scrollPosition === 0 && pathname === "/"
              ? "fill-white "
              : "fill-black",
            "mt-1",
          )}
        />
      </div>
      {isOpen && (
        <div className={"bg-white flex flex-col absolute mt-1 "} ref={popupRef}>
          {locales?.map((loc) => (
            <div
              key={loc}
              className={clsx(
                "py-1 cursor-pointer uppercase px-3",
                locale === loc ? " bg-gray-200" : "",
              )}
              onClick={() => {
                if (loc === locale) {
                  return;
                }

                if (pathname.includes("trainings")) {
                  push(
                    {
                      pathname: "/",
                    },
                    asPath,
                    { locale: loc },
                  );
                } else {
                  push(
                    {
                      pathname: pathname,
                      query: query,
                    },
                    asPath,
                    { locale: loc },
                  );
                }

                setOpen(false);
              }}
            >
              {loc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Languages;
