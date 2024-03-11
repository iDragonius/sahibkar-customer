export interface ImageProps {
  data: {
    id: string;
    attributes: {
      width: number;
      height: number;
      name: string;
      url: string;
    };
  };
}
