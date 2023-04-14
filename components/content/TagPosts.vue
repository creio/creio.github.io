<script setup lang="ts">
import type { post } from "~/schema";
import { formatDate } from '../../utils/formatDate';

const props = defineProps<{
  data: post;
}>();
</script>

<template>
    <ul>
        <li v-if="props.data.draft != true">
            <NuxtLink :to="props.data._path">
                {{ props.data.title }}
            </NuxtLink>
            &mdash; {{ formatDate(props.data.date) }}
            <div class="tag-list">
                <span class="tag-item" v-for="(e, i) in props.data.tags" :key="i">
                    <BaseButton :to="'/tags/' + e" variant="link" size="sm" color="secondary">
                      #{{ e }}
                    </BaseButton>
                </span>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.tag-list {
    // font-size: var(--size-step--1);
    .tag-item {
        margin-right: var(--sizing-md);
    }
}
</style>
