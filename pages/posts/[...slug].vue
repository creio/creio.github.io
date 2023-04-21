<script setup lang="ts">
import { formatDate } from '@/utils/formatDate'

const route = useRoute()
const actualPath = route.path.replace(/\/$/, '');
const config = useRuntimeConfig().public

const { data, error } = await useAsyncData(`content-${actualPath}`, () => {
  return queryContent()
    .where({ _path: actualPath })
    .findOne()
})
if (error.value) {
    throw createError({statusCode: 404, statusMessage: 'Not Found', fatal: true});
}

const pageTitle = data?.value?.title ? data?.value?.title : config.siteTitle
const pageDesc = data?.value?.description ? data?.value?.description : config.siteDesc
const pageImg = data?.value?.img ? data?.value?.img : config.cover

useHead({
    title: pageTitle + ' | ' + config.siteTitle,
    meta: [
        {
          hid: "description",
          name: "description",
          content: pageDesc,
        },
        {
          hid: "og:type",
          property: "og:type",
          content: 'article',
        },
        {
          hid: "og:url",
          property: "og:url",
          content: config.siteUrl + data.value._path,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: pageTitle + ' | ' + config.siteTitle,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: pageDesc,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: pageImg,
        },
    ],
});
</script>

<template>
    <main class="article-page">
        <article class="article-layout">
            <aside class="article-meta">
                <div v-if="data.date" class="article-meta-block">
                    <h4 class="eyebrow">Опубликовано</h4>
                    <p>{{ formatDate(data.date) }}</p>
                </div>
                <div v-if="data.tags" class="article-meta-block">
                    <h4 class="eyebrow">Tags</h4>
                    <ul class="tag-list">
                        <li v-for="tag in data.tags" :key="tag">
                            <NuxtLink :to="'/tags/' + tag" class="hover:underline">#{{ tag }}</NuxtLink>
                        </li>
                    </ul>
                </div>
                <Toc v-if="data.body.toc.links != 0" :links="data.body.toc.links" />
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
            <ArticleNavigation class="prev-next" />
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

    .tag-list {
      margin: 0;
      padding: 0;
      list-style: none;
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

  .prev-next {
    grid-column: 3 / span 4;

    @media (max-width: 1200px) {
      grid-column: 3 / span 4;
      grid-row: 3;
    }

    @media (max-width: 988px) {
      grid-column: 2 / span 6;
      grid-row: 4;
    }
  }
}
:deep(.footnotes) {
  font-size: var(--size-step--1);
  border-top: 1px solid var(--border-color);
  margin-top: var(--sizing-xxxl);
}
:deep(sup a) {
  display: inline-block;
  padding: 3px;
  background-color: var(--color-middle-gray);
  color: var(--color-dark);
  line-height: 1;
  text-decoration: none;
  margin-left: 2px;
  font-weight: 700;
  transition: var(--transition);
  border-radius: 2px;

  &:hover {
    background-color: var(--color-primary);
  }
}
</style>
