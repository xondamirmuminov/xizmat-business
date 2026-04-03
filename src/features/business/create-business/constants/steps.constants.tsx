import {
  BusinessImagesFormStep,
  BusinessGeneralFormStep,
  BusinessAddressFormStep,
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
    next: "create_business.steps.address.title",
    title: "create_business.steps.images_media.title",
  },
  {
    key: "address",
    component: <BusinessAddressFormStep />,
    next: "create_business.steps.address.title",
    title: "create_business.steps.address.title",
  },
];
