import { JellyfinState } from "@/store/modules/jellyfin/state";
import JellyfinUsers from "@/store/modules/jellyfin/users";
import { User } from "@/axios/jellyfin/objects/User";
import { SessionInfo } from "@/axios/jellyfin/objects/SessionInfo";
import { JellyfinApi } from "@/axios/jellyfin/JellyfinApi";
import { SystemInfo } from "@/axios/jellyfin/objects/SystemInfo";

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
    },
    setSystemInfo(state: JellyfinState, systemInfo: SystemInfo | null) {
      state.systemInfo = systemInfo;
    }
  },
  actions: {
    // @ts-ignore
    async getSystemInfo({ commit, rootState }) {
      let jellyfinApi = new JellyfinApi(rootState.jellyfin.serverUrl, null);
      let systemInfo = await jellyfinApi.getPublicSystemInfo();

      commit("setSystemInfo", systemInfo);
    }
  },
  modules: {
    users: JellyfinUsers
  }
};
