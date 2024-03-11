import React, { FC } from "react";
import { NavigationProps } from "@/interfaces/layout.interface";
import NavigationItem from "@/components/layout/ui/header/navigation/item";
import Languages from "@/components/layout/ui/header/navigation/languages";

export interface NavigationComponentProps {
  data: NavigationProps;
}

const Navigation: FC<NavigationComponentProps> = ({ data }) => {
  return (
    <div className={"min-[1000px]:flex gap-6 items-center hidden "}>
      {data.data.attributes.navigations.map((navigation) => (
        <NavigationItem key={navigation.id} data={navigation} />
      ))}
      {/*<Languages />*/}
    </div>
  );
};

export default Navigation;
