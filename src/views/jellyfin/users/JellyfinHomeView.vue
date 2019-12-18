<template>
  <div>
    <Navbar />
    <section class="hero is-black is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          {{ currentUser }}
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
