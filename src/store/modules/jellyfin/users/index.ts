import { JellyfinUsersState } from "@/store/modules/jellyfin/users/state";
import { User } from "@/axios/jellyfin/objects/User";
import { JellyfinApi } from "@/axios/jellyfin/JellyfinApi";
import { ResumableItems } from "@/axios/jellyfin/objects/ResumableItems";

export default {
  state: new JellyfinUsersState(),
  getters: {},
  mutations: {
    addUsers(state: JellyfinUsersState, users: User[]) {
      state.users.push(...users);
    },
    clearUsers(state: JellyfinUsersState) {
      state.users = [];
    },
    setResumableItems(
      state: JellyfinUsersState,
      resumableItems: ResumableItems | null
    ) {
      state.resumableItems = resumableItems;
    },
    setNextUpEpisodes(
      state: JellyfinUsersState,
      nextUpEpisodes: ResumableItems | null
    ) {
      state.nextUpEpisodes = nextUpEpisodes;
    }
  },
  actions: {
    // @ts-ignore
    async loadUsers({ state, commit, rootState }) {
      if (state.users.length === 0) {
        let jellyfinApi = new JellyfinApi(rootState.jellyfin.serverUrl, null);

        let users = await jellyfinApi.getPublicUsers();

        commit("addUsers", users);
      }
    },
    async loginWithUsername(
      // @ts-ignore
      { state, commit, rootState },
      // @ts-ignore
      { username, password }
    ) {
      let jellyfinApi = new JellyfinApi(rootState.jellyfin.serverUrl, null);
      let response = await jellyfinApi.tryLoginWithUsername(username, password);

      commit("setAccessToken", response.AccessToken);
      commit("setCurrentUser", response.User);
      commit("setSessionInfo", response.SessionInfo);
    },
    async logout(
      // @ts-ignore
      { commit, rootState }
    ) {
      let jellyfinApi = new JellyfinApi(
        rootState.jellyfin.serverUrl,
        rootState.jellyfin.accessToken
      );

      let response = await jellyfinApi.logout();

      if (response) {
        commit("setAccessToken", null);
        commit("setCurrentUser", null);
        commit("setSessionInfo", null);
        commit("setSystemInfo", null);
        commit("setResumableItems", null);
      }
    },
    async getResumableItems(
      // @ts-ignore
      { commit, rootState }
    ) {
      let jellyfinApi = new JellyfinApi(
        rootState.jellyfin.serverUrl,
        rootState.jellyfin.accessToken
      );

      let resumableItems = await jellyfinApi.getResumableItems(
        rootState.jellyfin.currentUser.Id
      );

      commit("setResumableItems", resumableItems);
    },
    async getNextUpEpisodes(
      // @ts-ignore
      { commit, rootState }, payload
    ) {
      let jellyfinApi = new JellyfinApi(
        rootState.jellyfin.serverUrl,
        rootState.jellyfin.accessToken
      );

      let nextUpEpisodes = await jellyfinApi.getNextUpEpisodes(payload);

      commit("setNextUpEpisodes", nextUpEpisodes);
    }
  }
};
