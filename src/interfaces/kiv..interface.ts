import { ImageProps } from "@/interfaces/shared.interface";
export interface BrandingItemProps {
  id: string;
  description: string;
  name: string;
  file: {
    data: {
      id: string;
      attributes: {
        url: string;
      };
    };
  };
}
export interface VideoItemProps {
  id: string;
  thumbnail: ImageProps;
  url: string;
}
export interface ImageItemProps {
  id: string;
  image: ImageProps;
}
export interface KivResponse {
  kiv: {
    data: {
      id: string;
      attributes: {
        brandings: BrandingItemProps[];
        images: ImageItemProps[];
        videos: VideoItemProps[];
      };
    };
  };
}
