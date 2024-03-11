import { ImageProps } from "@/interfaces/shared.interface";

export interface NavigationElementSubProps {
  id: string;
  label: string;
  path: string;
  status: boolean;
  trainings: {
    data: {
      id: string;
      attributes: {
        name: string;
      };
    }[];
  };
}

export interface NavigationElementProps {
  id: string;
  label: string;
  path: string;
  status: boolean;
  hasLink: boolean;
  subs: NavigationElementSubProps[];
}
export interface NavigationProps {
  data: {
    id: string;
    attributes: {
      navigations: NavigationElementProps[];
    };
  };
}
export interface ContactProps {
  data: {
    id: string;
    attributes: {
      address: string;
      email: string;
      phone: string;
    };
  };
}
export interface SocialLinkElementProps {
  url: string;
  id: string;
  icon: ImageProps;
}
export interface SocialLinkProps {
  data: {
    id: string;
    attributes: {
      links: SocialLinkElementProps[];
    };
  };
}
export interface LayoutResponse {
  contact: ContactProps;
  navigation: NavigationProps;
  socialLink: SocialLinkProps;
}
