export const PX_PER_PT = 4 / 3;

export const A4_WIDTH_PT = 595;
export const A4_HEIGHT_PT = 842;
export const A4_WIDTH_PX = A4_WIDTH_PT * PX_PER_PT;
export const A4_HEIGHT_PX = A4_HEIGHT_PT * PX_PER_PT;

export const SIDEBAR_NAV_LINKS = [
  {
    name: "Home",
    href: "home",
    isLocked: false,
  },
  {
    name: "My Resume",
    href: "my-resume/skills",
    isLocked: false,
  },
  {
    name: "LinkedIn Optimisation",
    href: "linkedin-optimisation",
    isLocked: false,
    subMenu: [
      // {
      //   name: "Profile Building",
      //   href: "",
      //   isLocked: false,
      // },
      // {
      //   name: "Staying Connected",
      //   href: "",
      //   isLocked: false,
      // },
      // {
      //   name: "Content Generator",
      //   href: "",
      //   isLocked: false,
      //   isBeta: true,
      // },
    ],
  },
  {
    name: "Portfolio",
    href: "",
    isLocked: false,
    isBeta: true,
  },
  {
    name: "Applications",
    href: "applications",
    isLocked: false,
    subMenu: [
      {
        name: "Interview Prep",
        href: "interview-prep",
        isLocked: false,
      },
      // {
      //   name: "Cover Letter",
      //   href: "",
      //   isLocked: false,
      // },
      // {
      //   name: "Cold Emails",
      //   href: "",
      //   isLocked: false,
      // },
      // {
      //   name: "Referral Applications",
      //   href: "",
      //   isLocked: false,
      // },
    ],
  },
];


export const WITHOUT_UNIBOT = [
  "/uniboard/linkedin-optimisation/content-generator/planner",
  "/uniboard/linkedin-optimisation/content-generator/1",
  "/uniboard/home",
];
