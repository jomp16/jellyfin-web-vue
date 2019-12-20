<template>
  <div>
    <Navbar :user="currentUser" />
    <section class="hero is-black is-fullheight-with-navbar">
      <div class="container is-fluid">
        <span class="has-text-weight-bold is-size-4">Continue Watching</span>
        <div class="columns is-multiline columns-padding">
          <div
            class="column is-3"
            v-for="item in resumableItems.Items"
            :key="item.Id"
          >
            <ResumableItem :item="item" />
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
import ResumableItem from "@/components/item/ResumableItem.vue";

@Component({
  components: {
    ResumableItem,
    Navbar
  }
})
export default class JellyfinHomeView extends Vue {
  // noinspection JSUnusedGlobalSymbols
  async created() {
    await this.$store.dispatch("getSystemInfo");

    if (!this.$store.getters.isLoggedIn) {
      await this.$router.push("/server-url");

      return;
    }

    await this.$store.dispatch("getResumableItems");
  }

  get currentUser(): User {
    return this.$store.state.jellyfin.currentUser;
  }

  get resumableItems(): ResumableItems {
    return this.$store.state.jellyfin.users.resumableItems;
  }
}
</script>

<style lang="sass" scoped>
.container
  padding-top: 1rem
.columns-padding
  padding-top: 1rem
</style>
