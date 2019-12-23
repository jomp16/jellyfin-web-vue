<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="showLoading" />

    <Navbar :user="currentUser" />
    <section class="hero is-black is-fullheight-with-navbar">
      <div class="section" v-if="!showLoading">
        <div class="container is-fluid">
          <div v-if="resumableItems != null && resumableItems.Items.length > 0">
            <span class="has-text-weight-normal is-size-4">
              Continue Watching
            </span>
            <div class="columns is-mobile">
              <div
                class="column is-one-fifth-tablet is-two-fifths-mobile"
                v-for="item in resumableItems.Items"
                :key="item.Id"
              >
                <Item :item="item" />
              </div>
            </div>
          </div>
          <div v-if="nextUpEpisodes != null && nextUpEpisodes.Items.length > 0">
            <span class="has-text-weight-normal is-size-4">
              Next Up
            </span>
            <div class="columns is-mobile next-up-slider">
              <div
                class="column is-one-fifth-tablet is-two-fifths-mobile"
                v-for="item in nextUpEpisodes.Items"
                :key="item.Id"
              >
                <Item :item="item" />
              </div>
            </div>
          </div>
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
import { ResumableItems } from "@/axios/jellyfin/objects/ResumableItems";
import Item from "@/components/item/Item.vue";

@Component({
  components: {
    Item,
    Navbar
  }
})
export default class JellyfinHomeView extends Vue {
  private showLoading: boolean = true;

  // noinspection JSUnusedGlobalSymbols
  async created() {
    await this.$store.dispatch("getSystemInfo");

    if (!this.$store.getters.isLoggedIn) {
      await this.$router.push("/server-url");

      return;
    }

    if (this.resumableItems === null || this.resumableItems.Items.length <= 0) {
      await this.$store.dispatch("getResumableItems");
    }

    if (this.nextUpEpisodes === null || this.nextUpEpisodes.Items.length <= 0) {
      await this.$store.dispatch("getNextUpEpisodes", {
        Limit: 24,
        Fields: "PrimaryImageAspectRatio,SeriesInfo,DateCreated,BasicSyncInfo",
        UserId: this.$store.state.jellyfin.currentUser.Id,
        ImageTypeLimit: 1,
        EnableImageTypes: "Primary,Backdrop,Banner,Thumb",
        EnableTotalRecordCount: false
      });
    }

    this.showLoading = false;
  }

  get currentUser(): User {
    return this.$store.state.jellyfin.currentUser;
  }

  get resumableItems(): ResumableItems | null {
    return this.$store.state.jellyfin.users.resumableItems;
  }

  get nextUpEpisodes(): ResumableItems | null {
    return this.$store.state.jellyfin.users.nextUpEpisodes;
  }
}
</script>

<style lang="sass" scoped>
.container
  padding-top: 1rem
.columns-padding
  padding-top: 1rem
.columns
  padding-top: 0.5rem
</style>
