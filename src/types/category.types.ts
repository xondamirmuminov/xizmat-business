import { LocalizedTextType } from "./common.types";

export type CategoryType = {
  _id: string;
  image?: string;
  parentId?: string;
  childrenCount: number;
  title: LocalizedTextType;
};
