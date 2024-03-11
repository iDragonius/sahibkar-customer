import React, { FC, useState } from "react";
import clsx from "clsx";
import useScrollPosition from "@/hooks/useScrollPosition";
import whitelogo from "@/assets/whitelogo.png";
import coloredlogo from "@/assets/coloredlogo.png";
import Image from "next/image";
import { NavigationProps } from "@/interfaces/layout.interface";
import Navigation from "@/components/layout/ui/header/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import { BurgerMenu, Cross } from "@/components/icons";
import ResponsiveNavbar from "@/components/layout/ui/header/responvise-navbar";
export interface HeaderProps {
  data: NavigationProps;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ data, loading }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const scrollPosition = useScrollPosition();
  const { pathname } = useRouter();
  return (
    <>
      <div
        className={clsx(
          scrollPosition === 0 && pathname === "/"
            ? "bg-hero"
            : "bg-white border-b border-b-[#BABABA]",
          "sticky top-0 w-full  z-[100] ",
        )}
      >
        <div className={"box h-[80px] flex items-center justify-between "}>
          <Link href={"/"}>
            {scrollPosition === 0 && pathname === "/" ? (
              <Image src={whitelogo} alt={"white"} />
            ) : (
              <Image src={coloredlogo} alt={"colored"} />
            )}
          </Link>
          <div className={"flex"}>
            <div
              onClick={() => setOpen((prevState) => !prevState)}
              className={clsx(
                "  flex min-[1000px]:hidden items-center justify-center rounded-[4px] trans  h-8 w-8   cursor-pointer",
                scrollPosition === 0 && pathname === "/"
                  ? "hover:bg-black hover:bg-opacity-20"
                  : "hover:bg-gray-100",
              )}
            >
              {isOpen ? (
                <Cross
                  className={clsx(
                    scrollPosition === 0 && pathname === "/"
                      ? "fill-white"
                      : "fill-black",
                  )}
                />
              ) : (
                <BurgerMenu
                  className={clsx(
                    scrollPosition === 0 && pathname === "/"
                      ? "fill-white"
                      : "fill-black",
                  )}
                />
              )}
            </div>
            <Navigation data={data} />
          </div>
        </div>
      </div>

      {isOpen && !loading && (
        <ResponsiveNavbar data={data} close={() => setOpen(false)} />
      )}
    </>
  );
};

export default Header;
