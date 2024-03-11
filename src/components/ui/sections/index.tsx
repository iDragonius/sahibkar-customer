import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import clsx from "clsx";

export interface SectionsProps {
  sections: string[];
  active: string;
  setActive: (active: string) => void;
  type: 1 | 2;
}

const Sections: FC<SectionsProps> = ({ sections, active, setActive, type }) => {
  const { t } = useTranslation("common");
  return (
    <div className={"flex  justify-center mt-12  "}>
      <div
        className={clsx(
          " overflow-x-auto flex",
          type === 1 ? "w-[400px] " : "w-[600px]",
        )}
      >
        {sections.map((section) => (
          <div
            onClick={() => setActive(section)}
            key={section}
            className={clsx(
              "min-w-[200px] h-8 flex items-center justify-center cursor-pointer",
              active === section
                ? " bg-[#91A8D6] text-white"
                : " border border-[#91A8D6] text-[#91A8D6]",
            )}
          >
            {t(section)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sections;
