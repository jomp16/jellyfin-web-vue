import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Jellyfin from "@/store/modules/jellyfin";
import Flash from "@/store/modules/flash";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    jellyfin: Jellyfin,
    flash: Flash
  },
  plugins: [vuexLocal.plugin]
});
