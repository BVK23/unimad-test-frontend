import { create } from "zustand";

export const useChatHistoryStore = create((set, get) => ({
  chatSections: {},

  setChatSection: (sectionName, chatHistory) =>
    set(state => ({
      chatSections: {
        ...state.chatSections,
        [sectionName]: chatHistory,
      },
    })),

  getChatSection: sectionName => {
    return get().chatSections[sectionName] || []; // Return empty array if not set
  },

  updateChatSection: (sectionName, updater) =>
    set(state => {
      const currentChat = state.chatSections[sectionName] || [];
      return {
        chatSections: {
          ...state.chatSections,
          [sectionName]: updater(currentChat),
        },
      };
    }),
}));

// export const useChatHistoryStore = create(set => ({
//     homeSec : [],
//     skillsSec : [],
//     experiencesSec : [],
//     projectsSec : [],
//     educationSec : [],
//     roleSec : [],
//     coverpicSec : [],
//     headlineSec : [],
//     aboutSec: [],
//     commentSec: [],
//     connectSec: [],
//     coverletterSec: [],
//     resumeSec : [],
//     anySec : [],
//     setHomeSec: homeSec => set({ homeSec }),
//     setSkillsSec: skillsSec => set({ skillsSec }),
//     setExperiencesSec: experiencesSec => set({ experiencesSec }),
//     setProjectsSec : projectsSec => set({ projectsSec }),
//     setEducationSec : educationSec => set({ educationSec }),
//     setRoleSec : roleSec => set({ roleSec }),
//     setCoverpicSec : coverpicSec => set({ coverpicSec }),
//     setHeadlineSec : headlineSec => set({ headlineSec }),
//     setAboutSec : aboutSec => set({ aboutSec }),
//     setCommentSec : commentSec => set({ commentSec }),
//     setConnectSec : connectSec => set({ connectSec }),
//     setCoverletterSec : coverletterSec => set({ coverletterSec }),
//     setResumeSec : resumeSec => set({ resumeSec }),
//     setAnySec : anySec => set({ anySec }),
// }));
