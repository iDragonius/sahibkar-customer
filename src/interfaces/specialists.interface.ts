import { ImageProps } from "@/interfaces/shared.interface";

export interface SpecialistItemProps {
  id: string;
  attributes: {
    fullName: string;
    image: ImageProps;
    position: string;
    description: string;
  };
}

export interface SpecialistsResponse {
  specialists: {
    data: SpecialistItemProps[];
  };
}
