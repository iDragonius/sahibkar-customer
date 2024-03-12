import React, { FC } from "react";
import { InfoItemProps } from "@/interfaces/home.interface";

export interface InfoProps {
  data: InfoItemProps[];
}

const Info: FC<InfoProps> = ({ data }) => {
  return (
    <div
      className={
        "flex min-[1000px]:flex-row flex-col px-10 py-7 bg-hero justify-between items-center sm:rounded-[24px]"
      }
    >
      {data.map((info, i) => (
        <>
          {i !== 0 && (
            <div
              className={
                "h-[142px] w-[1px] bg-[#B8B8B8] hidden min-[1000px]:block"
              }
            />
          )}
          <div
            key={i}
            className={
              "text-white min-[1000px]:border-none border-b min-[1000px]:w-max w-full min-[1000px]:py-0 py-5"
            }
          >
            <div className={"mb-3 flex gap-1  items-end w-max mx-auto"}>
              <p
                className={
                  "text-[36px] font-bold text-left min-[1000px]:text-center "
                }
              >
                {info.value}
              </p>
              {info.hasTime && <p className={"mb-2 text-20"}>saat</p>}
            </div>

            <p
              className={
                " text-20 sm:text-28 font-medium min-[1000px]:text-center"
              }
            >
              {info.label}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Info;
