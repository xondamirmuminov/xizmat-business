import { ReactElement } from "react";

import { IconPropsType, SocialMediaLinksType } from "@/types";
import {
  GlobeIcon,
  TiktokIcon,
  YoutubeIcon,
  FacebookIcon,
  TelegramIcon,
  InstagramIcon,
} from "@/assets";

type SocialLinkFieldType = {
  label: string;
  placeholder: string;
  name: keyof SocialMediaLinksType;
  icon: ReactElement<IconPropsType>;
};

export const SOCIAL_LINKS_FIELDS: SocialLinkFieldType[] = [
  {
    name: "website",
    icon: <GlobeIcon />,
    label: "create_business.steps.social_links.website.label",
    placeholder: "create_business.steps.social_links.website.placeholder",
  },
  {
    name: "instagram",
    icon: <InstagramIcon />,
    label: "create_business.steps.social_links.instagram.label",
    placeholder: "create_business.steps.social_links.instagram.placeholder",
  },
  {
    name: "telegram",
    icon: <TelegramIcon />,
    label: "create_business.steps.social_links.telegram.label",
    placeholder: "create_business.steps.social_links.telegram.placeholder",
  },
  {
    name: "facebook",
    icon: <FacebookIcon />,
    label: "create_business.steps.social_links.facebook.label",
    placeholder: "create_business.steps.social_links.facebook.placeholder",
  },
  {
    name: "youtube",
    icon: <YoutubeIcon />,
    label: "create_business.steps.social_links.youtube.label",
    placeholder: "create_business.steps.social_links.youtube.placeholder",
  },
  {
    name: "tiktok",
    icon: <TiktokIcon />,
    label: "create_business.steps.social_links.tiktok.label",
    placeholder: "create_business.steps.social_links.tiktok.placeholder",
  },
];
