import { JellyfinState } from "@/store/modules/jellyfin/state";
import JellyfinUsers from "@/store/modules/jellyfin/users";

export default {
  namespaced: true,
  state: new JellyfinState(),
  getters: {
    isLoggedIn: (state: JellyfinState) => {
      return state.serverUrl !== "" && state.connected;
    }
  },
  mutations: {
    updateServerURL(state: JellyfinState, serverUrl: string) {
      state.serverUrl = serverUrl;
    }
  },
  modules: {
    users: JellyfinUsers
  }
};
