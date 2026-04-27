import type { ImagePickerAsset } from "expo-image-picker";

import {
  ServiceType,
  ServiceImageSnapshot,
  ServiceFormValuesType,
} from "@/types";

function asImageAsset(uri: string): ImagePickerAsset {
  return { uri } as ImagePickerAsset;
}

/** Map API service to form values; `images` excludes primary to match create flow (primary is its own field). */
export function mapServiceToFormValues(service: ServiceType): ServiceFormValuesType {
  const duration = Math.max(0, Math.round(service.durationMinutes || 0));
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const primary = service.primaryImage
    ? asImageAsset(service.primaryImage)
    : undefined;
  const primaryUrl = service.primaryImage || "";
  const galleryUrls = (service.images || []).filter((u) => u && u !== primaryUrl);
  return {
    hours,
    minutes,
    price: service.price,
    primaryImage: primary,
    category: service.category,
    categoryId: service.categoryId || "",
    durationMinutes: service.durationMinutes,
    images: galleryUrls.map((uri) => asImageAsset(uri)),
    title: {
      en: service.title?.en || "",
      uz: service.title?.uz || "",
      ru: service.title?.ru || "",
    },
  };
}

export function imageSnapshotFromService(
  service: ServiceType,
): ServiceImageSnapshot {
  const p = service.primaryImage || "";
  return {
    primaryImage: p || undefined,
    images: (service.images || []).filter((u) => u && u !== p),
  };
}
