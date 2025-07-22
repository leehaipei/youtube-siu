import dayjs from "dayjs";
import type { RunObject } from "./SiuTypes";

const createName = ({ ARGS = [] }: RunObject): RunObject | void => {
  if (ARGS.includes("useSiuName")) {
    return { saveFileName: `${dayjs().format("YYYY_MM_DD_HH_mm_ss")}_siu` };
  }
};

export default createName;
