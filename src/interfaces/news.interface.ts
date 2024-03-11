import { ImageProps } from "@/interfaces/shared.interface";

export interface NewsCardProps {
  id: string;
  attributes: {
    date: string;
    shortDescription: string;
    thumbnail: ImageProps;
    title: string;
    type: string;
  };
}

export interface NewsResponse {
  newss: {
    data: NewsCardProps[];
  };
}
