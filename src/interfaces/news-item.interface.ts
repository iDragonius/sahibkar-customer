import { NewsCardProps } from "@/interfaces/news.interface";

export interface NewsItemResponse {
  news: {
    data: {
      id: string;
      attributes: {
        assets: {
          data: {
            id: string;
            attributes: {
              width: number;
              height: number;
              name: string;
              url: string;
            };
          }[];
        };
        date: string;
        content: string;
        title: string;
        type: string;
      };
    };
  };
  newss: {
    data: NewsCardProps[];
  };
}
