import React, { FC } from "react";
import { OpportunityItemProps } from "@/interfaces/home.interface";
import clsx from "clsx";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";

export interface OpportunitiesProps {
  data: OpportunityItemProps[];
}

const Opportunities: FC<OpportunitiesProps> = ({ data }) => {
  return (
    <div className={"flex flex-col gap-10"}>
      {data.map((opp, i) => (
        <div
          key={opp.id}
          className={clsx(
            i % 2 === 1
              ? "min-[850px]:flex-row"
              : "min-[850px]:flex-row-reverse",
            "flex justify-between items-center flex-col-reverse",
          )}
        >
          <Image
            src={ServerUrl + opp.image.data.attributes.url}
            alt={opp.image.data.attributes.name}
            width={332}
            height={236}
          />
          <div className={"min-[850px]:w-[410px] min-[850px]:mb-0 mb-6"}>
            <h3 className={"text-24  font-medium mb-4 text-heading2"}>
              {opp.title}
            </h3>
            <p>{opp.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Opportunities;
