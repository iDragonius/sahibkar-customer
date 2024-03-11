import React, { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import CREATE_EMAIL_SUBSCRIPTION from "@/gql/mutations/email-subscription.mutation";
import { EmailPattern } from "@/constants/patterns";

export interface EmailSubscriptionProps {}

const EmailSubscription: FC<EmailSubscriptionProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [createSubscription] = useMutation(CREATE_EMAIL_SUBSCRIPTION);
  const [error, setError] = useState<null | string>(null);
  const send = () => {
    if (!EmailPattern.test(email)) {
      setError("E-maili düzgün daxil edin");
      return;
    } else {
      setError(null);
    }

    createSubscription({
      variables: {
        email,
      },
    }).then(() => {
      setError(null);
      setEmail("");
    });
  };
  return (
    <div className={"min-[700px]:w-[600px] mx-auto"}>
      <h2 className={"text-center text-28 font-medium mb-6  text-heading"}>
        Yeniliklərdən xəbərdar olun
      </h2>
      <div className={"mb-4 "}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className={
            "w-full  bg-[#F7F7F7] text-14 placeholder:text-[#535A64] px-2 py-4 outline-none"
          }
          placeholder={"E-mail adresinizi daxil edin"}
        />
        {error && <p className={"text-red-500 mt-1"}>{error}</p>}
      </div>

      <button
        onClick={send}
        className={
          "w-full bg-[#535A64] text-white py-3 font-semibold leading-7 trans  hover:bg-white border-2 border-[#535A64] hover:text-[#535A64]"
        }
      >
        Abunə olun
      </button>
    </div>
  );
};

export default EmailSubscription;
