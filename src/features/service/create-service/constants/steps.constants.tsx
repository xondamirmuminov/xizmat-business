import { ReactNode } from "react";

import { ServiceFormValuesType } from "@/types";

import {
  ServiceImagesFormStep,
  ServiceGeneralFormStep,
  ServiceCategoryFormStep,
} from "../steps";

type ServiceFormStepType = {
  key: string;
  next: string;
  title: string;
  component: ReactNode;
  fields: (keyof ServiceFormValuesType)[];
};

export const SERVICE_FORM_STEPS: ServiceFormStepType[] = [
  {
    key: "category",
    fields: ["categoryId"],
    component: <ServiceCategoryFormStep />,
    next: "create_service.steps.general.title",
    title: "create_service.steps.category.title",
  },
  {
    key: "general",
    component: <ServiceGeneralFormStep />,
    next: "create_service.steps.images.title",
    title: "create_service.steps.general.title",
    fields: ["durationMinutes", "price", "title", "hours", "minutes"],
  },
  {
    key: "images-media",
    fields: ["images", "primaryImage"],
    component: <ServiceImagesFormStep />,
    next: "create_service.steps.images.next",
    title: "create_service.steps.images.title",
  },
];
