export interface SimpleItemProps {
  title: string;
  description: string;
  id: string;
}
export interface MissionsAndVisionsResponse {
  missionsAndVision: {
    data: {
      attributes: {
        missions: SimpleItemProps[];
        visions: SimpleItemProps[];
      };
    };
  };
}
