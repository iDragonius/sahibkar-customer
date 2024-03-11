import { ImageProps } from "@/interfaces/shared.interface";

export interface SuccessesAndCertificatesItem {
  id: string;
  attributes: {
    image: ImageProps;
    name: string;
    pdf: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
  };
}
export interface SuccessesAndCertificatesResponse {
  successesAndCertificates: {
    data: SuccessesAndCertificatesItem[];
  };
}
