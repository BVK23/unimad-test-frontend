export const WITHOUT_UNIBOT = ["/uniboard/linkedin-optimisation/content-generator/planner"];

export const isPathWithoutUniBot = pathname => {
  const dynamicPathRegex = /^\/uniboard\/linkedin-optimisation\/content-generator\/\d+$/;
  return WITHOUT_UNIBOT.includes(pathname) || dynamicPathRegex.test(pathname);
};

export const isHomePage = pathname => {
  return pathname === "/uniboard/home";
};
