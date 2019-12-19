<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <img
          :src="
            `${$store.state.jellyfin.serverUrl}/Items/${item.Id}/Images/Primary?tag=${item.ImageTags.Primary}&quality=90`
          "
          alt="Primary episode image"
        />
      </figure>
    </div>
    <div class="card-content has-background-black has-text-white">
      <div class="content has-text-centered">
        <p>
          <span class="has-text-weight-bold">
            {{ item.SeriesName }}
          </span>
          -
          <span>
            S{{ item.ParentIndexNumber.toString().padStart(2, "0") }}E{{
              item.IndexNumber.toString().padStart(2, "0")
            }}</span
          >
          -
          <span class="is-italic">{{ item.Name }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Component from "vue-class-component";
import { Prop, Vue } from "vue-property-decorator";
import { Item } from "@/axios/jellyfin/objects/Item";

@Component
export default class JellyfinHomeView extends Vue {
  @Prop() private item!: Item;
}
</script>

<style lang="sass" scoped>
.card-content
  padding: 0.5rem
</style>
