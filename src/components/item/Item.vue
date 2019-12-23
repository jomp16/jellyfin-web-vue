<template>
  <div class="card is-unselectable">
    <div class="card-image">
      <figure class="image">
        <img
          :src="
            `${$store.state.jellyfin.serverUrl}/Items/${item.Id}/Images/Primary?tag=${item.ImageTags.Primary}&quality=90`
          "
          alt="Primary episode image"
        />
        <div
          class="progress-bar is-extra-small"
          v-if="item.UserData.PlayedPercentage !== undefined"
        >
          <div
            class="progress-bar-status is-extra-small"
            :style="{ width: `${item.UserData.PlayedPercentage}%` }"
          ></div>
        </div>
      </figure>
      <div class="is-overlay overlay-image">
        <div class="overlay-container is-flex">
          <span class="mdi mdi-play overlay-image-play icon-circle-hover" />
          <div class="overlay-more-actions">
            <span class="mdi mdi-check icon-circle-action icon-circle-hover" />
            <span class="mdi mdi-heart icon-circle-action icon-circle-hover" />
            <span
              class="mdi mdi-dots-horizontal icon-circle-action icon-circle-hover"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card-content has-background-black has-text-white">
      <div class="content has-text-centered">
        <div class="is-text-overflow">
          <router-link
            class="has-text-weight-bold normal-link"
            :to="{ path: `/series/${item.SeriesId}` }"
          >
            {{ item.SeriesName }}
          </router-link>
        </div>
        <div class="is-text-overflow">
          <router-link
            class="normal-link"
            :to="{ path: `/episode/${item.Id}` }"
          >
            S{{ item.ParentIndexNumber }}:E{{ item.IndexNumber }} -
            {{ item.Name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Component from "vue-class-component";
import { Prop, Vue } from "vue-property-decorator";
import { Item } from "@/axios/jellyfin/objects/Item";

@Component
export default class ResumableItem extends Vue {
  @Prop() private item!: Item;
}
</script>

<style lang="sass">
.card-content
  padding: 0.5rem

.progress-bar
  position: absolute
  bottom: 0
  width: 100%
  background-color: rgba(0, 0, 0, .5)

  .progress-bar-status
    background-color: #00a4dc
</style>
