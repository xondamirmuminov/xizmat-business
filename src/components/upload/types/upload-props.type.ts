import { ImagePickerAsset } from "expo-image-picker";

export type UploadPropsType = {
  multiple?: boolean;
  disabled?: boolean;
  value?: ImagePickerAsset | ImagePickerAsset[];
  onChange?: (file: null | ImagePickerAsset | ImagePickerAsset[]) => void;
};
