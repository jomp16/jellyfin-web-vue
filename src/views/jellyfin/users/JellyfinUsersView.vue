<template>
  <section class="hero is-black is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div
          v-for="(users, i) in groupedUsers"
          class="columns is-centered"
          :key="i"
        >
          <div v-for="user in users" class="column is-2" :key="user.id">
            <div class="card">
              <div class="card-image">
                <figure
                  class="image is-square"
                  :class="{
                    'has-background-grey': user.PrimaryImageTag === undefined
                  }"
                >
                  <img
                    v-if="user.PrimaryImageTag !== undefined"
                    v-bind:src="
                      `${$store.state.jellyfin.serverUrl}/Users/${user.Id}/Images/Primary?tag=${user.PrimaryImageTag}&quality=90`
                    "
                    alt="User primary image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4 has-text-centered has-text-black">
                      {{ user.Name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
export default class JellyfinUsersView extends Vue {
  numberOfUsersPerColumn = 6;
  chunk = require("lodash.chunk");

  // noinspection JSUnusedGlobalSymbols
  mounted() {
    this.$store.dispatch("jellyfin/users/loadUsers");
  }

  get users() {
    return this.$store.state.jellyfin.users.users;
  }

  get groupedUsers() {
    return this.chunk(this.users, this.numberOfUsersPerColumn);
  }
}
</script>
