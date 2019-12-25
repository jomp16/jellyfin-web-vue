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
    async getPublicSystemInfo({ commit, rootState }: any) {
      let jellyfinApi = new JellyfinApi(rootState.jellyfin.serverUrl, null);
      let systemInfo = await jellyfinApi.getPublicSystemInfo();

      commit("setSystemInfo", systemInfo);
    },
    async getSystemInfo({ state, commit, dispatch }: any) {
      try {
        let jellyfinApi = new JellyfinApi(state.serverUrl, state.accessToken);
        let systemInfo = await jellyfinApi.getSystemInfo();

        commit("setSystemInfo", systemInfo);
      } catch (e) {
        if (e.message === "Session is expired, login again.") {
          commit("setFlashMessage", e.message);
          await dispatch("logout");

          return;
        }

        throw e;
      }
    }
  },
  modules: {
    users: JellyfinUsers
  }
};
