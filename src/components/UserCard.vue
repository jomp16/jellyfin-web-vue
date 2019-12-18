<template>
  <div class="card" @click="emitClickEvent">
    <div class="card-image">
      <figure class="image is-square has-background-primary">
        <img
          v-if="user.PrimaryImageTag !== undefined"
          :src="
            `${$store.state.jellyfin.serverUrl}/Users/${user.Id}/Images/Primary?tag=${user.PrimaryImageTag}&quality=90`
          "
          alt="User primary image"
        />
        <img v-else :src="loginDefaultImage" alt="User primary image" />
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "@/axios/jellyfin/objects/User";

@Component
export default class UserCard extends Vue {
  @Prop() private user!: User;

  private loginDefaultImage = require("@/assets/logindefault.png");

  emitClickEvent() {
    this.$emit("click");
  }
}
</script>
