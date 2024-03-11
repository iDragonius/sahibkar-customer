import React, { FC, ReactNode } from "react";
import { Poppins } from "next/font/google";
import clsx from "clsx";
import Header from "@/components/layout/ui/header";
import Footer from "@/components/layout/ui/footer";
import { useQuery } from "@apollo/client";
import GET_LAYOUT from "@/gql/queries/layout.query";
import { useRouter } from "next/router";
import { Simulate } from "react-dom/test-utils";
import { LayoutResponse, NavigationProps } from "@/interfaces/layout.interface";
import { Config } from "@/constants/config";

export interface LayoutProps {
  children: ReactNode;
}

const poppins = Poppins({
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const Layout: FC<LayoutProps> = ({ children }) => {
  const { locale } = useRouter();
  const { data, loading } = useQuery<LayoutResponse>(GET_LAYOUT, {
    variables: {
      locale: Config.multiLanguage ? locale : "az",
    },
  });
  if (loading) {
    return <div></div>;
  }

  return (
    <div className={clsx(poppins.className)}>
      <div className={"min-h-[calc(100vh-352px)]"}>
        <Header loading={loading} data={data?.navigation as NavigationProps} />
        {children}
      </div>

      <Footer contact={data!.contact} socialLink={data!.socialLink} />
    </div>
  );
};

export default Layout;
