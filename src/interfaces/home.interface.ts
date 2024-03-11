import { ImageProps } from "@/interfaces/shared.interface";
import { NewsCardProps } from "@/interfaces/news.interface";
import exp from "constants";
import { SpecialistItemProps } from "@/interfaces/specialists.interface";

export interface PartnerItemProps {
  id: string;
  attributes: {
    logo: ImageProps;
    url: string;
  };
}
export interface TrainingItemProps {
  id: string;
  attributes: {
    name: string;
    date: string;
    mainInfo: string;
  };
}
export interface OpportunityItemProps {
  id: string;
  description: string;
  image: ImageProps;
  title: string;
}
export interface InfoItemProps {
  id: string;
  label: string;
  value: string;
  hasTime: boolean;
}
export interface AnnouncementItemProps {
  address: string;
  certificateType: string;
  id: string;
  image: ImageProps;
  isFree: boolean;
  name: string;
  time: string;
  trainer: string;
  training: {
    data: {
      id: string;
    };
  };
}

export interface HeroCarouselProps {
  title: string;
  description: string;
  link: string;
  image: ImageProps;
}

export interface HomeResponse {
  homePage: {
    data: {
      id: string;
      attributes: {
        announcements: AnnouncementItemProps[];
        opportunities: OpportunityItemProps[];
        infos: InfoItemProps[];
        videoBannerDescription: string;
        videoBannerTitle: string;
        videoBannerUrl: string;
        videoBannerThumbnail: ImageProps;
        hero: HeroCarouselProps[];
        trainings: {
          data: TrainingItemProps[];
        };
      };
    };
  };
  customers: {
    data: PartnerItemProps[];
  };
  newss: {
    data: NewsCardProps[];
  };
  partners: {
    data: PartnerItemProps[];
  };
  trainings: {
    data: TrainingItemProps[];
  };
  specialists: {
    data: SpecialistItemProps[];
  };
}
