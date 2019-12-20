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
</style>
