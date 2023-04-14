<script setup lang="ts">
import PrimaryLogo from '~/assets/images/logo.svg';

const config = useRuntimeConfig().public

const props = defineProps({
  showLabel: { type: Boolean, default: false },
  logoLarge: { type: Boolean, default: false },
});
</script>

<template>
  <div class="brand-logo" :class="{ large: logoLarge }">
    <PrimaryLogo />
    <div v-if="showLabel" class="brand-logo__type">{{config.siteTitle}}</div>
  </div>
</template>

<style lang="scss">
.brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  transition: var(--transition);
  padding: 0;
  gap: 0.5rem;

  &__image {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--color-dark);
    background-color: var(--color-dark);
    z-index: 10;
    transition: var(--transition-cubic-slow);
    flex: 0 0 2rem;

    @media (max-width: 768px) {
      height: 1.5rem;
      width: 1.5rem;
      flex: 0 0 1.5rem;
    }

    .circle-shape {
      fill: var(--color-primary);
      transition: var(--transition-cubic-slow);
    }
    .logo-shape {
      fill: var(--color-light);
      transition: var(--transition-cubic-slow);
    }
  }

  &__type {
    font-size: var(--size-step--1);
    transition: all 0.125s ease-in-out;
    line-height: 1;
    text-transform: uppercase;
    font-variation-settings: 'wdth' 90;
    letter-spacing: 0.1em;
    text-shadow: 0 0 6px var(--color-primary,.6);
  }

  @media (min-width: 769px) {
    &:hover {
      .brand-logo__image {
        border: 1px solid var(--color-primary-hover);
        background-color: var(--color-primary-hover);
        transform: rotate(720deg);
        .circle-shape {
          fill: var(--color-primary);
        }
        .logo-shape {
          fill: var(--color-dark);
        }
      }
    }
  }
}
</style>
