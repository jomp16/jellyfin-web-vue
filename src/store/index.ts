import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Jellyfin from "@/store/modules/jellyfin";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    jellyfin: Jellyfin
  },
  plugins: [vuexLocal.plugin]
});
