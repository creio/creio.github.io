<script setup lang="ts">
const config = useRuntimeConfig().public
const { params: { slug }, } = useRoute();

const { data } = await useAsyncData('posts', () => queryContent('/posts')
    .where([{ tags: { $contains: slug } }, { type: 'post' }, { draft: { $ne: true } }])
    .sort({ date: -1 })
    .find());

useHead({
  title: slug + " tag | " + config.siteTitle,
});
</script>

<template>
  <main>
    <div class="blog-layout">
      <div class="blog-layout__content">
        <div class="content-area flow">
          <h1>{{ slug }}</h1>
          <div class="post-item" v-for="post in data" :key="post._path">
              <TagPosts :data="post" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.blog-layout {
  max-width: var(--max-width);
  margin-inline: auto;

  &__content {
    margin-block-end: 2rem;

    @media (min-width: 768px) {
      display: grid;
      gap: var(--sizing-xl);
      grid-template-columns: repeat(8, 1fr);
    }

    hr {
      grid-column: 1 / span 4;
      margin-block-start: 2rem;
      margin-block-end: 3rem;
    }
  }

  .blog-title {
    color: var(--color-primary);
    z-index: 2;
    position: relative;
    font-size: clamp(var(--size-step-6), 10vw, 120px);
    line-height: 1;
  }

  .content-area {
    grid-column: 2 / span 6;
  }

  .sidebar-area {
    grid-column: 1;
  }

  .button-group {
    --flow-space: 2.5em;
    display: flex;
    align-items: center;
    gap: var(--sizing-md);
  }
}
</style>
