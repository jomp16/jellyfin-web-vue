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
        /* webpackChunkName: "server-url" */ "../views/jellyfin/JellyfinServerUrlView.vue"
      )
  },
  {
    path: "/users",
    name: "users",
    component: () =>
      import(
        /* webpackChunkName: "users" */ "../views/jellyfin/users/JellyfinUsersView.vue"
      )
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
