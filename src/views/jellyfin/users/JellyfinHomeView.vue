<template>
  <section class="hero is-black is-fullheight">
    <div class="hero-body">
      <div class="container">
        {{ currentUser }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { User } from "@/axios/jellyfin/objects/User";

@Component
export default class JellyfinHomeView extends Vue {
  // noinspection JSUnusedGlobalSymbols
  mounted() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/server-url");
    }
  }

  get currentUser(): User {
    return this.$store.state.jellyfin.currentUser;
  }
}
</script>
