<template>
  <div class="is-flex is-centered is-vcentered">
    <div
      class="card-carousel--nav__left"
      @click="moveCarousel(-1)"
      :disabled="atHeadOfList"
    ></div>
    <div class="column is-full is-paddingless">
      <div class="is-text-overflow">
        <div
          class="is-flex card-carousel-cards"
          :style="{
            transform: 'translateX' + '(' + currentOffset + 'px' + ')'
          }"
        >
          <slot />
        </div>
      </div>
    </div>
    <div
      class="card-carousel--nav__right"
      @click="moveCarousel(1)"
      :disabled="atEndOfList"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Carousel extends Vue {
  @Prop({ default: 0 }) private currentOffset!: number;
  @Prop({ default: 3 }) private windowSize!: number;
  @Prop({ default: 220 }) private paginationFactor!: number;
  @Prop() private length!: number;

  moveCarousel(direction: number) {
    // Find a more elegant way to express the :style. consider using props to make it truly generic
    if (direction === 1 && !this.atEndOfList) {
      this.currentOffset -= this.paginationFactor;
    } else if (direction === -1 && !this.atHeadOfList) {
      this.currentOffset += this.paginationFactor;
    }
  }

  get atEndOfList() {
    return (
      this.currentOffset <=
      this.paginationFactor * -1 * (this.length - this.windowSize)
    );
  }

  get atHeadOfList() {
    return this.currentOffset === 0;
  }
}
</script>

<style lang="scss">
$vue-navy: #2c3e50;
$vue-navy-light: #3a5169;
$vue-teal: #42b883;
$vue-teal-light: #42b983;
$gray: #666a73;
$light-gray: #f8f8f8;

.card-carousel-cards {
  transition: transform 150ms ease-out;
  transform: translateX(0px);
}

.card-carousel {
  &--nav__left,
  &--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 2px solid $vue-teal;
    border-right: 2px solid $vue-teal;
    cursor: pointer;
    margin: 0 20px;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.2;
      border-color: black;
    }
  }

  &--nav__left {
    transform: rotate(-135deg);
    &:active {
      transform: rotate(-135deg) scale(0.9);
    }
  }

  &--nav__right {
    transform: rotate(45deg);
    &:active {
      transform: rotate(45deg) scale(0.9);
    }
  }
}
</style>
