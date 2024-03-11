import { ImageProps } from "@/interfaces/shared.interface";

export interface TrainingResponse {
  training: {
    data: {
      id: string;
      attributes: {
        hasInfo: boolean;
        mainInfo: string;
        additionalInfo: string;
        image: ImageProps;
        price: number;
        name: string;
        duration: string;
        lessonsCount: number;
        participants: number;
      };
    };
  };
}
