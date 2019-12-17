import { JellyfinUsersState } from "@/store/modules/jellyfin/users/state";
import { User } from "@/axios/jellyfin/objects/User";
import { JellyfinApi } from "@/axios/jellyfin/JellyfinApi";
import { JellyfinState } from "@/store/modules/jellyfin/state";

export default {
  namespaced: true,
  state: new JellyfinUsersState(),
  getters: {},
  mutations: {
    addUser(state: JellyfinUsersState, user: User) {
      state.users.push(user);
    },
    addUsers(state: JellyfinUsersState, users: User[]) {
      state.users.push(...users);
    }
  },
  actions: {
    // @ts-ignore
    async loadUsers({ state, commit, rootState }) {
      console.log(rootState);
      if (state.users.length === 0) {
        let jellyfinApi = new JellyfinApi(rootState.jellyfin.serverUrl);

        let users = await jellyfinApi.getPublicUsers();

        commit("addUsers", users);
      }
    }
  }
};
