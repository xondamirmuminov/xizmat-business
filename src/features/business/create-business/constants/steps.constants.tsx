import { BusinessGeneralFormStep } from "../steps";

export const BUSINESS_FORM_STEPS = [
  {
    key: "general",
    component: <BusinessGeneralFormStep />,
    title: "create_business.steps.general.title",
    next: "create_business.steps.images_media.title",
  },
  {
    key: "images-media",
    component: <BusinessGeneralFormStep />,
    next: "create_business.steps.images_media.title",
    title: "create_business.steps.images_media.title",
  },
];
