<script setup lang="ts">
defineProps({
  links: Object,
});
</script>

<template>
  <div class="toc-content">
    <h4 class="eyebrow">Содержание</h4>
    <ul class="">
      <li class="" v-for="(link, index) in links" :key="link.text">
        <a class="toc-link" :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <a class="top-toc" href="#">Вверх <Icon name="ph:arrow-up" /></a>
  </div>
</template>

<style lang="scss" scoped>
.toc-content {
    position: sticky;
    top: 1rem;
    font-size: 0.9rem;
    background-color: hsla(100, 100%, 100%, 5%);
    padding: var(--sizing-sm);
    border-radius: var(--sizing-sm);
    max-height: 80vh;
    overflow-y: auto;

    .toc-link {
        text-shadow: none;
    }

    @media (max-width: 988px) {
      .top-toc {
        display: none;
      }
    }
}
</style>
