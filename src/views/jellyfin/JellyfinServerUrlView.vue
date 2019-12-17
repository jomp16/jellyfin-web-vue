<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <b-field label="Server URL">
          <b-input v-model="serverURL" required />
        </b-field>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-half">
        <b-button type="is-success" expanded @click="showServerUsers">
          Connect
        </b-button>
      </div>
    </div>
  </div>
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
    this.$router.push("/users");
  }
}
</script>

<!--<style lang="sass">
body
  background-color: black
</style>-->
