// sectionNameUtils.js

const sectionNameMapping = {
  "profile-picture": "profilepicture",
  "cover-picture": "coverpicture",
  "profile-building": "profilebuilding",
  "content-generator": "contentgen",
  "cover-letter": "coverletter",
  "referral-applications": "referral",
  "cold-emails": "coldemail",
};

// const routesWithIdParam = ["interview-prep", "vpd"];

// Exclude these pages from 'linkedin_' prefix logic
const excludeLinkedInPrefix = ["cover-picture", "headline", "about", "profile-picture"];

export const createSectionName = (pathname, queryParams) => {
  const parts = pathname.split("/").filter(Boolean); // Remove empty parts

  // Remove 'uniboard' from path parts
  const filteredParts = parts.filter(part => part !== "uniboard");

  // Special case for the homepage with an id query param
  if (filteredParts[0] === "home" && queryParams?.id) {
    return `home${queryParams.id}`; // e.g., 'home<uuid>'
  }

  // Special case for /my-resume and /my-resume/{number}
  if (filteredParts[0] === "my-resume") {
    const lastPart = filteredParts[filteredParts.length - 1];

    // Check if last part is a number (dynamic resume ID)
    if (!isNaN(lastPart)) {
      return `resume${lastPart}`; // Return 'resume1', 'resume2', etc.
    }

    // If only '/my-resume', return 'resume'
    if (filteredParts.length === 1) {
      return "resumes";
    }
  }

  // Handle dynamic routes for /content-generator/{number}
  if (filteredParts[0] === "linkedin-optimisation" && filteredParts[1] === "content-generator") {
    const lastPart = filteredParts[filteredParts.length - 1];

    // Check if last part is a number for dynamic content generator paths
    if (!isNaN(lastPart)) {
      return `contentgen${lastPart}`; // Return 'contentgen1', 'contentgen2', etc.
    }
  }

  // Handle LinkedIn optimisation profile-building routes
  if (filteredParts[0] === "linkedin-optimisation" && filteredParts[1] === "profile-building") {
    const lastPart = filteredParts[filteredParts.length - 1];

    // Check if the last part is in the exclusion list
    if (excludeLinkedInPrefix.includes(lastPart)) {
      return sectionNameMapping[lastPart] || lastPart; // Return directly without 'linkedin_' prefix
    }

    // Create the LinkedIn-specific section name for non-excluded routes
    return `linkedin_${lastPart}`; // Return 'linkedin_skills', 'linkedin_experiences', etc.
  }

  if (filteredParts[0] === "applications") {
    const lastPart = filteredParts[filteredParts.length - 1];

    // Check if last part is a number for dynamic referral, coverletter, and coldemail paths
    if (!isNaN(lastPart)) {
      return `${sectionNameMapping[filteredParts[1]]}${lastPart}`; // Return 'coverletter1', 'referral2', etc.
    }
  }

  // Apply section name mappings if necessary
  const lastPart = filteredParts[filteredParts.length - 1];

  return sectionNameMapping[lastPart] || lastPart || "home"; // Use mapping if available
};

// const unibotSectionNameMap = {
//   '/uniboard/home' : 'home',
//   '/uniboard/my-resume/skills' : 'skills',
//   '/uniboard/my-resume/experiences' : 'experiences',
//   '/uniboard/my-resume/projects' : 'projects',
//   '/uniboard/my-resume/education' : 'education',
//   '/uniboard/my-resume/role' : 'role',
//   '/uniboard/linkedin-optimisation/profile-building/cover-picture' : 'coverpic',
//   '/uniboard/linkedin-optimisation/profile-building/headline' : 'headline',
//   '/uniboard/linkedin-optimisation/profile-building/about' : 'about',
//   '/uniboard/linkedin-optimisation/staying-connected/comment' : 'comment',
//   '/uniboard/linkedin-optimisation/staying-connected/connect' : 'connect',
//   '/uniboard/applications/cover-letter' : 'coverletter',
//   '/uniboard/applications/referral-applications' : 'referral',
//   '/uniboard/my-resume' : 'resume',
//   // Include a fallback for any other paths
//   'default': 'any',
// }
