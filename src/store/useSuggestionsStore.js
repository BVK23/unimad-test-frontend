import { create } from "zustand";

const useSuggestionsStore = create((set, get) => ({
  suggestions: {},

  // New array to define sections where suggestions should be appended
  isAppendSection: ["coverpicture", "headline", "comment"],

  setSuggestions: (sectionName, newSuggestions) => {
    const appendSections = get().isAppendSection;

    set(state => {
      const currentSuggestions = state.suggestions[sectionName] || [];
      const mergedSuggestions = appendSections.includes(sectionName)
        ? [...new Set([...currentSuggestions, ...newSuggestions])] // Merge and remove duplicates
        : newSuggestions;

      return {
        suggestions: {
          ...state.suggestions,
          [sectionName]: mergedSuggestions,
        },
      };
    });
  },

  // Array of sections that require suggestions
  suggestionSections: [
    "skills",
    "role",
    "coverpicture",
    "headline",
    "about",
    "connect",
    "comment",
    "planner",
  ],

  // Array of prefixes for dynamic sections (e.g., "resume1", "coverletter2", etc.)
  dynamicSectionPrefixes: ["resume", "coverletter", "contentgen", "referral", "coldemail"],

  // Function to check if a section should preserve content (updated to handle dynamic sections)
  shouldPreserveContent: sectionName => {
    const baseSections = [
      "about",
      "coverletter",
      "connect",
      "comment",
      "coverpicture",
      "headline",
      "referral",
      "coldemail",
    ];
    const dynamicPrefixes = ["coverletter", "referral", "coldemail"];

    // Check if the section is one of the static ones
    if (baseSections.includes(sectionName)) {
      return true;
    }

    // Check dynamic sections
    for (const prefix of dynamicPrefixes) {
      if (sectionName.startsWith(prefix)) {
        const dynamicPart = sectionName.slice(prefix.length);

        // Ensure the dynamic part is a number
        if (!isNaN(dynamicPart) && dynamicPart.length > 0) {
          return true;
        }
      }
    }

    return false;
  },

  // Function to check if a section requires suggestions (handles both static and dynamic sections)
  isSectionInSuggestions: sectionName => {
    const suggestionSections = get().suggestionSections;
    const dynamicPrefixes = get().dynamicSectionPrefixes;

    // Check if the section is in the static suggestion sections
    if (suggestionSections.includes(sectionName)) {
      return true;
    }

    // Handle dynamic sections using prefixes
    for (const prefix of dynamicPrefixes) {
      if (sectionName.startsWith(prefix)) {
        const dynamicPart = sectionName.slice(prefix.length);

        // Check if the dynamic part is a valid number (for sections like "resume1", "coverletter2", etc.)
        if (!isNaN(dynamicPart) && dynamicPart.length > 0) {
          return true;
        }
      }
    }

    return false;
  },

  // Getter function to safely access suggestions for a section
  getSuggestionsForSection: sectionName => {
    const suggestions = get().suggestions;
    return suggestions[sectionName] || []; // Return empty array if not set
  },
}));

export default useSuggestionsStore;
