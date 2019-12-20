<template>
  <section class="hero is-black is-fullheight">
    <b-loading :is-full-page="true" :active.sync="showLoading" />

    <div class="hero-body">
      <div class="container is-fluid">
        <div class="columns is-centered">
          <div class="column is-half"></div>
        </div>
        <div class="columns is-centered is-mobile">
          <figure class="image is-128x128">
            <img :src="jellyfinImageURL" alt="Jellyfin Icon" />
          </figure>
        </div>
        <div class="columns is-centered">
          <div class="column is-half">
            <b-field
              label="Server URL"
              type="is-white"
              custom-class="has-text-white"
              label-for="serverURL"
            >
              <b-input v-model="serverURL" id="serverURL" required />
            </b-field>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-half">
            <b-button type="is-primary" expanded @click="showServerUsers">
              Connect
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class JellyfinServerUrlView extends Vue {
  private jellyfinImageURL = require("@/assets/jellyfin_icon.png");
  private showLoading: boolean = false;
  private errorMessage: string | null = null;

  // noinspection JSUnusedGlobalSymbols
  async created() {
    this.errorMessage = this.$store.getters.flashMessage;
    this.showLoading = false;
    await this.$store.commit("setFlashMessage", null);
  }

  get serverURL(): string {
    return this.$store.state.jellyfin.serverUrl;
  }

  set serverURL(value: string) {
    this.$store.commit("updateServerURL", value);
  }

  async showServerUsers() {
    try {
      this.showLoading = true;
      await this.$store.dispatch("getPublicSystemInfo");
      await this.$store.commit("clearUsers");
      await this.$store.dispatch("loadUsers");
      await this.$router.push("/login");
    } catch (e) {
      this.showLoading = false;
      this.errorMessage = e;
    }
  }
}
</script>
