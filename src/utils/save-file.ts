import { saveAs } from "file-saver";
import { ServerUrl } from "@/constants/server-url";

const saveFile = (link: string, fileName: string) => {
  saveAs(`${ServerUrl}${link}`, fileName);
};
export default saveFile;
