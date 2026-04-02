import {
  BusinessImagesFormStep,
  BusinessGeneralFormStep,
  BusinessCategoriesFormStep,
} from "../steps";

export const BUSINESS_FORM_STEPS = [
  {
    key: "general",
    component: <BusinessGeneralFormStep />,
    title: "create_business.steps.general.title",
    next: "create_business.steps.categories.title",
  },
  {
    key: "categories",
    component: <BusinessCategoriesFormStep />,
    title: "create_business.steps.categories.title",
    next: "create_business.steps.images_media.title",
  },
  {
    key: "images-media",
    component: <BusinessImagesFormStep />,
    next: "create_business.steps.images_media.title",
    title: "create_business.steps.images_media.title",
  },
];
