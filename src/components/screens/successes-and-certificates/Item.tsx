import React, { FC } from "react";
import { SuccessesAndCertificatesItem } from "@/interfaces/successes-and-certificates.interface";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";
import Link from "next/link";

export interface ItemProps {
  data: SuccessesAndCertificatesItem;
}

const Item: FC<ItemProps> = ({ data }) => {
  return (
    <Link
      href={ServerUrl + data.attributes.pdf.data.attributes.url}
      target={"_blank"}
    >
      <Image
        src={ServerUrl + data.attributes.image.data.attributes.url}
        alt={data.attributes.image.data.attributes.name}
        width={383}
        height={180}
        className={"w-full object-cover"}
      />
      <p className={"text-center mt-4 text-14"}> {data.attributes.name}</p>
    </Link>
  );
};

export default Item;
