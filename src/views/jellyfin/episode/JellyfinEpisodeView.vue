<template>
  <div>
    <Navbar :user="currentUser" />
    <section class="hero is-black is-fullheight-with-navbar">
      <div class="section">
        <div class="container is-fluid">
          {{ episodeId }}
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { User } from "@/axios/jellyfin/objects/User";
import Navbar from "@/components/navbar/Navbar.vue";

@Component({
  components: {
    Navbar
  }
})
export default class JellyfinEpisodeView extends Vue {
  // noinspection JSUnusedGlobalSymbols
  async created() {
    await this.$store.dispatch("getSystemInfo");

    if (!this.$store.getters.isLoggedIn) {
      await this.$router.push("/server-url");

      return;
    }
  }

  get currentUser(): User {
    return this.$store.state.jellyfin.currentUser;
  }

  get episodeId(): string {
    return this.$route.params.id;
  }
}
</script>

<style lang="sass" scoped>
.container
  padding-top: 1rem
.columns-padding
  padding-top: 1rem
</style>
