export type TransitionsType = {
  hidden: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
  visible: {
    opacity: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
};

export type SlugType = {
  current: string;
};

export type SiteSettingsType = {
  email: string;
  info: string;
  services: string;
};

export type MediaType = {
  asset: {
    playbackId: string;
  };
};

export type ProjectType = {
  slug: SlugType;
  title: string;
  description: string;
  siteUrl: string;
  desktopMedia: MediaType;
  mobileMedia: MediaType;
};
