import React, { FC, useState } from "react";
import { NavigationElementProps } from "@/interfaces/layout.interface";
import useScrollPosition from "@/hooks/useScrollPosition";
import clsx from "clsx";
import Link from "next/link";
import { DropdownIcon } from "@/components/icons";
import { useBoolean } from "usehooks-ts";
import { useRouter } from "next/router";

export interface NavigationItemProps {
  data: NavigationElementProps;
}

const NavigationItem: FC<NavigationItemProps> = ({ data }) => {
  const scrollPosition = useScrollPosition();
  const { pathname } = useRouter();
  const { setValue: setOpen, value: isOpen } = useBoolean(false);
  return (
    <>
      {!!data.subs.length ? (
        <div
          className={"relative"}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className={"flex gap-1 items-center cursor-pointer"}>
            <span
              className={clsx(
                scrollPosition === 0 && pathname === "/"
                  ? "text-white"
                  : "text-black",
                "text-16 font-medium",
              )}
            >
              {data.label}
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
          {isOpen && <SubSections data={data} />}
        </div>
      ) : (
        <Link
          href={data.path}
          className={clsx(
            scrollPosition === 0 && pathname === "/"
              ? "text-white"
              : "text-black",
            "text-16 font-medium",
          )}
        >
          {data.label}
        </Link>
      )}
    </>
  );
};
const SubSections = ({ data }: { data: NavigationElementProps }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [activeSubs, setActiveSubs] = useState<
    null | { id: string; attributes: { name: string } }[]
  >(null);

  return (
    <div className={""}>
      <div
        className={
          "bg-white flex flex-col gap-4 min-w-[150px] px-3 absolute py-4 shadow-md"
        }
      >
        {data.subs.map((sub) => {
          if (!!sub.trainings.data.length) {
            return (
              <div
                key={sub.id}
                className={"w-full  relative flex justify-between items-center"}
                onMouseOver={() => setActiveSubs(sub.trainings.data)}
              >
                <div className={"cursor-pointer font-medium text-18 "}>
                  {sub.label}
                </div>
                <DropdownIcon className={clsx("mt-1 -rotate-90 fill-black")} />
              </div>
            );
          } else {
            return (
              <Link
                href={data.path + sub.path}
                key={sub.id}
                className={"w-max  trans hover:text-hover font-medium"}
              >
                {sub.label}
              </Link>
            );
          }
        })}
      </div>
      {activeSubs && (
        <div className={"absolute left-40 p-4 bg-white w-[200px]"}>
          {activeSubs.map((training) => (
            <Link
              href={`/trainings/${training.id}`}
              className={"text-14 py-1.5 block trans hover:text-hover"}
              key={training.id}
            >
              {training.attributes.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default NavigationItem;
