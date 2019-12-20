import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index
  },
  {
    path: "/server-url",
    name: "server-url",
    component: () =>
      import(
        /* webpackChunkName: "server-url" */ "@/views/jellyfin/server/JellyfinServerUrlView.vue"
      )
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "@/views/jellyfin/users/JellyfinLoginView.vue"
      )
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/views/jellyfin/users/JellyfinHomeView.vue"
      )
  },
  {
    path: "/series/:id",
    name: "series",
    component: () =>
      import(
        /* webpackChunkName: "series" */ "@/views/jellyfin/series/JellyfinSeriesView.vue"
      )
  },
  {
    path: "/episode/:id",
    name: "episode",
    component: () =>
      import(
        /* webpackChunkName: "episode" */ "@/views/jellyfin/episode/JellyfinEpisodeView.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
