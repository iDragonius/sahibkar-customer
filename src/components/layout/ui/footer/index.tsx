import React, { FC } from "react";
import { ContactProps, SocialLinkProps } from "@/interfaces/layout.interface";
import whiteLogo from "@/assets/whitelogo.png";
import Image from "next/image";
import Link from "next/link";
import { ServerUrl } from "@/constants/server-url";
import { AddressIcon, EmailIcon, PhoneIcon } from "@/components/icons";
export interface FooterProps {
  contact: ContactProps;
  socialLink: SocialLinkProps;
}

const Footer: FC<FooterProps> = ({ contact, socialLink }) => {
  return (
    <>
      <div className={"py-5 min-[700px]:py-20 bg-[#00779F]"}>
        <div
          className={
            "box flex justify-between min-[700px]:flex-row flex-col flex-wrap gap-8"
          }
        >
          <div className={"text-white"}>
            <Image src={whiteLogo} alt={"logo"} className={"-ml-8"} />
            <p className={"min-[700px]:w-[300px]  text-14 font-medium mt-4"}>
              Fəaliyyətimizi sosial media hesablarından da izləyə bilərsiniz.
            </p>
            <div className={"flex gap-4 mt-4"}>
              {socialLink.data.attributes.links.map((link) => (
                <Link href={link.url} target={"_blank"} key={link.id}>
                  <Image
                    src={ServerUrl + link.icon.data.attributes.url}
                    alt={link.icon.data.attributes.name}
                    width={link.icon.data.attributes.width}
                    height={link.icon.data.attributes.height}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className={"text-20 font-medium text-white mb-7"}>Əlaqə</h2>
            <div className={"flex flex-col gap-8 min-[700px]:mt-0 mt-10"}>
              <div className={"flex items-center gap-3 text-[#E2EBF3]"}>
                <PhoneIcon />
                <p>{contact.data.attributes.phone}</p>
              </div>
              <div className={"flex items-center gap-3 text-[#E2EBF3]"}>
                <AddressIcon />
                <p>{contact.data.attributes.address}</p>
              </div>
              <div className={"flex items-center gap-3 text-[#E2EBF3]"}>
                <EmailIcon />
                <p>{contact.data.attributes.email}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className={"text-20 font-medium text-white mb-7"}>Menu</h2>
            <div
              className={
                "flex flex-col gap-8 min-[700px]:mt-0 mt-10 text-white"
              }
            >
              <Link href={"/media-center/news"}>Xəbərlər</Link>
              <Link href={"/media-center/kiv"}>Media mərkəzi</Link>
              <Link href={"/specialists"}>Mütəxəssislər</Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={"py-[10px] bg-[#044961]  flex items-center justify-center "}
      >
        <p className={"font-medium text-white "}>
          Bu bir{" "}
          <Link
            href={"https://knexel.com"}
            className={"text-heading  leading-6 underline"}
          >
            Knexel
          </Link>{" "}
          məhsuludur.
        </p>
      </div>
    </>
  );
};

export default Footer;
