import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { ImageProps } from "@/interfaces/shared.interface";
import Image from "next/image";
import { ServerUrl } from "@/constants/server-url";
import useTranslation from "next-translate/useTranslation";
import { createDefaultMaskGenerator, MaskedInput } from "react-hook-mask";
import { useMutation } from "@apollo/client";
import CREATE_TRAINING_APPEAL from "@/gql/mutations/training-appeal.mutation";
import { EmailPattern } from "@/constants/patterns";
const maskGenerator = createDefaultMaskGenerator("99 999 99 99");

export interface FormProps {
  image: ImageProps;
  training: string;
}
export interface FormDataProps {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
}
export interface FormErrorProps {
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  message: string | null;
}
const Form: FC<FormProps> = ({ image, training }) => {
  const { t } = useTranslation("common");

  const [data, setData] = useState<FormDataProps>({
    fullName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrorProps>({
    fullName: null,
    phoneNumber: null,
    email: null,
    message: null,
  });
  const [createTrainingForm] = useMutation(CREATE_TRAINING_APPEAL);
  const changeData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const maskChange = (data: string) => {
    setData((prevState) => ({
      ...prevState,
      phoneNumber: data,
    }));
  };
  const save = (e: FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const errorsTemp: FormErrorProps = {
      fullName: null,
      phoneNumber: null,
      email: null,
      message: null,
    };
    if (data.fullName.trim().length < 4) {
      errorsTemp.fullName = "Tam adınızı düzgün daxil edin!";
      hasError = true;
    }

    if (data.phoneNumber.length !== 9) {
      console.log(data.phoneNumber);
      errorsTemp.phoneNumber = "Telefon nömrəsini düzgün daxil edin!";
      hasError = true;
    }
    if (!EmailPattern.test(data.email)) {
      errorsTemp.email = "Elektron poçtu düzgün daxil edin!";
      hasError = true;
    }

    if (hasError) {
      setErrors(errorsTemp);
      return;
    } else {
      setErrors({
        fullName: null,
        phoneNumber: null,
        email: null,
        message: null,
      });
    }
    createTrainingForm({
      variables: {
        ...data,
        training,
      },
    }).then(() => {
      setData({
        fullName: "",
        phoneNumber: "",
        email: "",
        message: "",
      });
    });
  };
  return (
    <div
      className={
        " min-[1100px]:sticky  mb-20  min-[1100px]:top-[160px]   min-[1100px]:min-w-[542px]  min-[1100px]:w-[542px]  w-full"
      }
      style={{
        alignSelf: "flex-start",
      }}
    >
      <Image
        src={ServerUrl + image.data.attributes.url}
        alt={image.data.attributes.name}
        width={542}
        height={236}
        className={"w-full"}
      />
      <h2 className={"mt-7 text-hover font-medium text-[22px]"}>
        {t("want_join")}
      </h2>
      <p className={"mt-2"}>{t("fill_data")}</p>
      <form className={"flex flex-col gap-7 mt-8"}>
        <Field
          type={"text"}
          placeholder={t("form_fullName")}
          value={data.fullName}
          onChange={changeData}
          name={"fullName"}
          error={errors.fullName}
        />{" "}
        <Field
          type={"phone"}
          placeholder={t("form_phoneNumber")}
          value={data.phoneNumber}
          onChange={changeData}
          name={"phoneNumber"}
          error={errors.phoneNumber}
          maskChange={maskChange}
        />{" "}
        <Field
          type={"email"}
          placeholder={t("form_email")}
          value={data.email}
          onChange={changeData}
          name={"email"}
          error={errors.email}
        />
        <Field
          type={"textarea"}
          placeholder={t("form_message")}
          value={data.message}
          onChange={changeData}
          name={"message"}
          error={errors.message}
        />
        <div className={"flex justify-end"}>
          <button
            onClick={save}
            className={
              "py-3 px-10 bg-secondary w-max trans hover:ring-4 hover:ring-secondary hover:ring-opacity-70 "
            }
          >
            {t("send")}
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  maskChange,
  error,
}: {
  type: "text" | "phone" | "email" | "textarea";
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name: string;
  maskChange?: (data: string) => void;
  error: null | string;
}) => {
  return (
    <div>
      {type === "textarea" && (
        <textarea
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          className={
            "block w-full  outline-none border-b border-[#B5B5B5] py-2 placeholder:text-[#A0A0A0] px-2 trans hover:border-hover focus:placeholder:text-hover hover:placeholder:text-hover hover:text-hover text-black focus:text-hover focus:border-hover"
          }
        />
      )}
      {type === "text" && (
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={"text"}
          placeholder={placeholder}
          className={
            "block w-full  outline-none border-b border-[#B5B5B5] py-2 placeholder:text-[#A0A0A0] px-2 trans hover:border-hover focus:placeholder:text-hover hover:placeholder:text-hover hover:text-hover text-black focus:text-hover focus:border-hover"
          }
        />
      )}
      {type === "email" && (
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={"email"}
          placeholder={placeholder}
          className={
            "block w-full  outline-none border-b border-[#B5B5B5] py-2 placeholder:text-[#A0A0A0] px-2 trans hover:border-hover focus:placeholder:text-hover hover:placeholder:text-hover hover:text-hover text-black focus:text-hover focus:border-hover"
          }
        />
      )}
      {type === "phone" && (
        <MaskedInput
          value={value}
          onChange={maskChange}
          name={name}
          maskGenerator={maskGenerator}
          placeholder={placeholder}
          className={
            "block w-full  outline-none border-b border-[#B5B5B5] py-2 placeholder:text-[#A0A0A0] px-2 trans hover:border-hover focus:placeholder:text-hover hover:placeholder:text-hover hover:text-hover text-black focus:text-hover focus:border-hover"
          }
        />
      )}
      {error && (
        <p className={"mt-1 text-red-500 text-14 font-medium "}>{error}</p>
      )}
    </div>
  );
};

export default Form;
