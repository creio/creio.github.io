<script setup lang="ts">
defineProps<{
  props: Object;
}>();
</script>

<template>
    <NuxtLink target="_blank" :href="props.url">
        <h4 class="h4-heading repo-name"><Icon name="mdi:source-repository" /> {{ props.name }}</h4>

        <p v-if="props.description != 'No description'" class="repo-desc">
            {{ props.description }}
        </p>

        <div class="gh-info">
            <div class="gh-star"><Icon name="ph:star" /> {{ props.stars }}</div>
            <div class="gh-fork"><Icon name="fe:fork" /> {{ props.forks }}</div>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
.repo-name {
    font-weight: 400;
}
.repo-desc {
    font-size: var(--size-step-0);
}
.gh-info {
    display: flex;
    .gh-star {
        margin-right: var(--sizing-md);
    }
    .gh-star, .gh-fork {
        display: flex;
        align-items: center;
    }
}
</style>
