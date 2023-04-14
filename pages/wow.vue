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
        <h1 v-html="data.title"></h1>
        <ContentDoc path="/wow" />
    </article>
  </main>
</template>
