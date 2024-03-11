import React, { FC, useState } from "react";
import { useLockedBody } from "usehooks-ts";
import {
  NavigationElementProps,
  NavigationElementSubProps,
  NavigationProps,
} from "@/interfaces/layout.interface";
import Link from "next/link";
import { DropdownIcon } from "@/components/icons";
import clsx from "clsx";
import { useRouter } from "next/router";

export interface ResponsiveNavbarProps {
  data: NavigationProps;
  close: () => void;
}

const ResponsiveNavbar: FC<ResponsiveNavbarProps> = ({ data, close }) => {
  useLockedBody(true, "root");
  const [isShown, setShown] = useState<boolean>(false);
  const { locale, locales, push, basePath, query, asPath, pathname } =
    useRouter();
  return (
    <div className={"h-full fixed w-full bg-white top-[81px]  z-[1000]"}>
      <div className={"box py-5"}>
        <div className={""}>
          {data.data.attributes.navigations.map((nav) => (
            <ResponsiveNavbarItem data={nav} key={nav.id} close={close} />
          ))}
        </div>
        {/*<div className={"mb-5"}>*/}
        {/*  <div*/}
        {/*    onClick={() => setShown((prevState) => !prevState)}*/}
        {/*    className={*/}
        {/*      "w-full flex justify-between border-b items-center  group trans hover:text-primary cursor-pointer text-navText py-4"*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <p className={"text-18 font-medium"}>Interface language</p>*/}
        {/*    <CaretDownIcon*/}
        {/*      className={clsx(*/}
        {/*        isShown ? "rotate-180 fill-primary" : "fill-navText",*/}
        {/*        "group-hover:fill-primary",*/}
        {/*      )}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  {isShown && (*/}
        {/*    <div className={" bg-white w-full border "}>*/}
        {/*      {locales?.map((lc) => (*/}
        {/*        <div*/}
        {/*          className={clsx(*/}
        {/*            lc === locale*/}
        {/*              ? "bg-primary text-white"*/}
        {/*              : "hover:text-primary",*/}
        {/*            "py-1 px-2 trans  cursor-pointer",*/}
        {/*          )}*/}
        {/*          key={lc}*/}
        {/*          onClick={() => {*/}
        {/*            push(*/}
        {/*              {*/}
        {/*                pathname: pathname,*/}
        {/*                query: query,*/}
        {/*              },*/}
        {/*              asPath,*/}
        {/*              { locale: lc },*/}
        {/*            );*/}
        {/*            localStorage.setItem("lang", lc);*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          {lc![0].toUpperCase() + lc![1]}*/}
        {/*        </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
const ResponsiveNavbarItem = ({
  data,
  close,
}: {
  data: NavigationElementProps;
  close: () => void;
}) => {
  const { pathname } = useRouter();

  const [isShown, setShown] = useState<boolean>(false);
  if (data.subs.length === 0) {
    if (data.status) {
      return (
        <Link
          onClick={close}
          href={data.path}
          className={
            "py-4 border-b text-18 text-black  cursor-pointer block trans hover:text-primary hover:font-semibold font-medium"
          }
          key={data.id}
        >
          {data.label}
        </Link>
      );
    }
  } else {
    return (
      <div className={"relative"}>
        <div
          onClick={() => setShown((prevState) => !prevState)}
          className={clsx(
            pathname.includes(data.path)
              ? "text-hover font-semibold"
              : "font-medium",
            "flex  justify-between py-4 border-b text-18 text-navText items-center trans hover:text-hover  group cursor-pointer h-full",
            isShown && "text-hover",
          )}
        >
          <p>{data.label}</p>
          {data.subs!.length > 0 && (
            <DropdownIcon
              className={clsx(
                pathname.includes(data.path) ? "fill-hover " : "fill-black",
                isShown && "rotate-180 fill-hover ",
                " group-hover:fill-hover",
              )}
            />
          )}
        </div>
        {isShown && (
          <div className={"flex flex-col py-1 border-y ml-5"}>
            {data.subs.map((sub) => {
              if (sub.status) {
                return (
                  <SubNavItem
                    data={sub}
                    key={sub.id}
                    close={close}
                    path={data.path}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    );
  }
};
const SubNavItem = ({
  data,
  close,
  path,
}: {
  data: NavigationElementSubProps;
  close: () => void;
  path: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  if (!!data.trainings.data.length) {
    return (
      <div>
        <div
          onClick={() => setOpen((prevState) => !prevState)}
          className={
            "flex justify-between items-center py-1 text-18 trans hover:text-hover"
          }
        >
          <p>{data.label}</p>
          {!!data.trainings.data.length && (
            <DropdownIcon
              className={clsx(open && "rotate-180 fill-hover ", "fill-black")}
            />
          )}
        </div>
        {open && (
          <div className={"mt-2"}>
            {data.trainings.data.map((training) => (
              <Link
                onClick={close}
                href={path + data.path + "/" + training.id}
                className={"block py-1.5 trans hover:text-hover"}
                key={training.id}
              >
                {training.attributes.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Link
        href={path + data.path}
        onClick={() => setOpen((prevState) => !prevState)}
        className={
          "flex justify-between items-center py-1 text-18 trans hover:text-hover"
        }
      >
        <p>{data.label}</p>
        {!!data.trainings.data.length && (
          <DropdownIcon
            className={clsx(open && "rotate-180 fill-hover ", "fill-black")}
          />
        )}
      </Link>
    );
  }
};
export default ResponsiveNavbar;
