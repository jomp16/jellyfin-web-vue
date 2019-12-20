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
      </figure>
      <b-progress
        :value="item.UserData.PlayedPercentage"
        type="is-info is-radiusless"
        size="is-extra-small"
      />
    </div>
    <div class="card-content has-background-black has-text-white">
      <div class="content has-text-centered">
        <div class="is-text-overflow">
          <span class="has-text-weight-bold">
            {{ item.SeriesName }}
          </span>
        </div>
        <div class="is-text-overflow">
          <span> S{{ item.ParentIndexNumber }}:E{{ item.IndexNumber }} </span>
          -
          <span>{{ item.Name }}</span>
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

<style lang="sass" scoped>
.card-content
  padding: 0.5rem
.is-text-overflow
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>

<style lang="sass">
.progress.is-extra-small
  height: 0.3rem
</style>
