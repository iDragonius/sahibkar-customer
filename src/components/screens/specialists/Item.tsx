import React, { FC } from "react";
import { SpecialistItemProps } from "@/interfaces/specialists.interface";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";

export interface ItemProps {
  data: SpecialistItemProps;
}

const Item: FC<ItemProps> = ({ data }) => {
  return (
    <div>
      <Image
        src={ServerUrl + data.attributes.image.data.attributes.url}
        alt={data.attributes.image.data.attributes.name}
        width={383}
        height={236}
        className={"w-full"}
      />
      <h3 className={"text-hover mt-3 text-18 sm:text-20 font-medium"}>
        {data.attributes.fullName}
      </h3>
      <p className={"mt-1 text-[#575757] text-16 sm:text-18 font-thin"}>
        {data.attributes.position}
      </p>
    </div>
  );
};

export default Item;
