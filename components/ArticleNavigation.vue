<script setup lang="ts">
const { path } = useRoute();

const [prev, next] = await queryContent('/posts')
  .only(['_path', 'title'])
  .sort({ date: -1 })
  .where([{ type: 'post' }, { draft: { $ne: true } }])
  .findSurround({ _path: path });
</script>

<template>
  <div class="article-navigation">
    <BaseButton
      v-if="next"
      :to="next._path"
      :title="next.title"
      class="prev-button"
      variant="outline"
      size="md"
      color="primary"
    >
      <Icon name="ri:arrow-left-line" /> Назад
    </BaseButton>
    <BaseButton
      v-if="prev"
      :to="prev._path"
      :title="prev.title"
      class="next-button"
      variant="outline"
      size="md"
      color="primary"
    >
      Вперед <Icon name="ri:arrow-right-line" />
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.article-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sizing-xxl) 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--sizing-md);
}

.prev-button {
  grid-column: 1;
}
.next-button {
  grid-column: 3;
  align-self: self-end;
}
</style>
