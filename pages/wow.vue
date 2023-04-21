<script setup lang="ts">
const { data } = await useAsyncData('/wow', () => {
  return queryContent()
    .where({ _path: '/wow' })
    .findOne()
})
</script>

<template>
    <main class="article-page">
        <article class="article-layout">
            <aside v-if="data.body.toc.links != 0" class="article-meta">
                <Toc :links="data.body.toc.links" />
            </aside>
            <header class="article-header">
                <h1 v-html="data.title"></h1>
            </header>
            <ContentRenderer :value="data">
                <ContentRendererMarkdown class="article-body flow" ref="nuxtContent" :value="data" />
                <template #empty>
                    <h1>No Content</h1>
                    <p>No content found.</p>
                </template>
            </ContentRenderer>
        </article>
    </main>
</template>

<style lang="scss" scoped>
.article-page {
  padding-left: 0;
  padding-right: 0;
}
.article-layout {
  @media (min-width: 1324px) {
    display: grid;
    gap: var(--sizing-xl);
    grid-template-columns:
      calc(50vw - (var(--max-width) / 2))
      repeat(6, 1fr)
      calc(50vw - (var(--max-width) / 2));
  }
  @media (max-width: 1323px) {
    display: grid;
    gap: var(--sizing-xl);
    grid-template-columns:
      var(--sizing-xl)
      repeat(6, 1fr)
      var(--sizing-xl);
  }

  @media (max-width: 881px) {
    display: grid;
    gap: var(--sizing-md);
    grid-template-columns:
      var(--sizing-lg)
      repeat(6, 1fr)
      var(--sizing-lg);
  }

  .article-header {
    padding-top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: 3 / span 5;
    grid-row: 1;

    @media (max-width: 988px) {
      grid-column: 2 / span 6;
      grid-row: 1;
    }
  }
  .article-body {
    font-size: var(--size-step-0);
    line-height: 1.65;
    // font-weight: normal;

    grid-column: 3 / span 4;
    grid-row: 2;

    @media (max-width: 1200px) {
      grid-column: 3 / span 4;
      grid-row: 2;
    }

    @media (max-width: 988px) {
      grid-column: 2 / span 6;
      grid-row: 3;
    }
  }

  .article-meta {
    border-top: 1px solid var(--border-color);
    padding: var(--sizing-md) 0;
    font-size: var(--size-step--1);
    font-weight: 400;
    grid-column: 2 / span 1;
    grid-row: 2;

    &-block {
      @media (min-width: 989px) {
        margin-block-end: 1.5rem;
      }
    }

    @media (min-width: 989px) {
      margin-top: 0.5rem;
    }

    @media (max-width: 988px) {
      grid-column: 2 / span 6;
      grid-row: 2;
      border-bottom: 1px solid var(--border-color);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--sizing-xl);
    }
  }
}
</style>
