<template>
  <section class="hero is-black is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <figure class="image is-128x128">
            <img
              :src="require('@/assets/jellyfin_icon.png')"
              alt="Jellyfin Icon"
            />
          </figure>
        </div>
        <div class="columns is-centered">
          <div class="column is-half">
            <b-field
              label="Server URL"
              type="is-white"
              custom-class="has-text-white"
            >
              <b-input v-model="serverURL" required />
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

<script>
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class JellyfinServerUrlView extends Vue {
  get serverURL() {
    return this.$store.state.jellyfin.serverUrl;
  }

  set serverURL(value) {
    this.$store.commit("jellyfin/updateServerURL", value);
  }

  showServerUsers() {
    this.$store.commit("jellyfin/users/clearUsers");
    this.$router.push("/users");
  }
}
</script>

<!--<style lang="sass">
body
  background-color: black
</style>-->
