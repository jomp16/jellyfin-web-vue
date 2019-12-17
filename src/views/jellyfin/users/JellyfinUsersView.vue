<template>
  <div class="container">
    <div v-for="(users, i) in groupedUsers" class="columns" :key="i">
      <div v-for="user in users" class="column is-3" :key="user.id">
        <div class="card">
          <div class="card-image">
            <figure
              class="image is-square"
              :style="{
                backgroundColor: user.PrimaryImageTag !== undefined ? '' : 'red'
              }"
            >
              <img
                v-if="user.PrimaryImageTag !== undefined"
                v-bind:src="
                  `https://jellyfin.rwx.ovh/Users/${user.Id}/Images/Primary?tag=${user.PrimaryImageTag}&quality=90`
                "
                alt="Primary image"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4 has-text-centered">{{ user.Name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class JellyfinUsersView extends Vue {
  numberOfColumns = 4;
  chunk = require("lodash.chunk");

  mounted() {
    this.$store.dispatch("jellyfin/users/loadUsers");
  }

  get users() {
    return this.$store.state.jellyfin.users.users;
  }

  get groupedUsers() {
    return this.chunk(this.users, this.numberOfColumns);
  }
}
</script>
