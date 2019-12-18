import { JellyfinState } from "@/store/modules/jellyfin/state";
import JellyfinUsers from "@/store/modules/jellyfin/users";
import { User } from "@/axios/jellyfin/objects/User";
import { SessionInfo } from "@/axios/jellyfin/objects/SessionInfo";

export default {
  state: new JellyfinState(),
  getters: {
    isLoggedIn: (state: JellyfinState) => {
      return state.serverUrl !== "" && state.accessToken !== null;
    }
  },
  mutations: {
    updateServerURL(state: JellyfinState, serverUrl: string) {
      state.serverUrl = serverUrl;
    },
    setAccessToken(state: JellyfinState, accessToken: string | null) {
      state.accessToken = accessToken;
    },
    setCurrentUser(state: JellyfinState, currentUser: User | null) {
      state.currentUser = currentUser;
    },
    setSessionInfo(state: JellyfinState, sessionInfo: SessionInfo | null) {
      state.sessionInfo = sessionInfo;
    }
  },
  modules: {
    users: JellyfinUsers
  }
};
