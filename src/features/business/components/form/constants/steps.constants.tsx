import { ReactNode } from "react";

import { BusinessFormValuesType } from "@/types";

import {
  BusinessImagesFormStep,
  BusinessGeneralFormStep,
  BusinessAddressFormStep,
  BusinessCategoriesFormStep,
  BusinessSocialLinksFormStep,
} from "../steps";

export type BusinessFormStepType = {
  key: string;
  next: string;
  title: string;
  component: ReactNode;
  fields: (keyof BusinessFormValuesType)[];
};

const BASE_BUSINESS_FORM_STEPS: BusinessFormStepType[] = [
  {
    key: "general",
    component: <BusinessGeneralFormStep />,
    title: "create_business.steps.general.title",
    next: "create_business.steps.categories.title",
    fields: ["businessName", "phoneNumbers", "workingDays", "workingHours"],
  },
  {
    key: "categories",
    fields: ["categoryIds"],
    component: <BusinessCategoriesFormStep />,
    title: "create_business.steps.categories.title",
    next: "create_business.steps.images_media.title",
  },
  {
    key: "images-media",
    component: <BusinessImagesFormStep />,
    fields: ["images", "logo", "thumbnail"],
    next: "create_business.steps.address.title",
    title: "create_business.steps.images_media.title",
  },
  {
    key: "address",
    fields: ["address", "coords"],
    component: <BusinessAddressFormStep />,
    title: "create_business.steps.address.title",
    next: "create_business.steps.social_links.title",
  },
  {
    key: "social-links",
    fields: ["socialMediaLinks"],
    component: <BusinessSocialLinksFormStep />,
    next: "create_business.steps.social_links.next",
    title: "create_business.steps.social_links.title",
  },
];

export function getBusinessFormSteps(
  type: "create" | "edit",
): BusinessFormStepType[] {
  const steps = [...BASE_BUSINESS_FORM_STEPS];
  const lastIdx = steps.length - 1;
  steps[lastIdx] = {
    ...steps[lastIdx],
    next:
      type === "edit"
        ? "edit_business.steps.social_links.next"
        : "create_business.steps.social_links.next",
  };
  return steps;
}
