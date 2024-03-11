import { SpecialistItemProps } from "@/interfaces/specialists.interface";

export interface SpecialistResponse {
  specialist: {
    data: SpecialistItemProps;
  };
  specialists: {
    data: SpecialistItemProps[];
  };
}
