<template>
  <b-navbar type="is-black" v-if="user !== null">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/home' }">
        <img :src="jellyfinImageURL" alt="Jellyfin" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/home' }">
        Home
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="p">
        {{ user.Name }}
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" @click="clickLogout">
            <strong>Logout</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "@/axios/jellyfin/objects/User";

@Component
export default class Navbar extends Vue {
  private jellyfinImageURL = require("@/assets/jellyfin_icon.png");
  @Prop() private user!: User | null;

  async clickLogout() {
    await this.$store.dispatch("logout");
    await this.$router.push("/");
  }
}
</script>
