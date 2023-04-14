<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";

const showTags = ref(false);
// const searchType = ref("");
// const searchTypeRef = ref(null);

// const searchTypes = computed(() => {
//   return [
//     searchType.value.charAt(0).toUpperCase() +
//       searchType.value.slice(1).toLowerCase(),
//     searchType.value.toLowerCase(),
//     searchType.value.toUpperCase(),
//   ];
// });

const { data: postsList, pending: isPostsLoading, refresh: refreshPosts } = await useAsyncData(
  "/posts", () => queryContent("/posts")
        .only(["_path", "title", "description", "date", "tags", "draft",])
        .where([{ type: 'post' }, { draft: { $ne: true } }])
        // .where([{ title: { $containsAny: searchTypes.value, }, }, { type: 'post' }, { draft: { $ne: true } }]) // search
        .sort({ date: -1 })
        .find()
);

const { data: tagsList } = await useAsyncData("tags", () =>
  queryContent("/posts")
    .only("tags")
    .where([{ type: 'post' }, { draft: { $ne: true } }])
    .find()
);

// watchEffect(async () => {
//   const { data: postsList, pending: isPostsLoading } = await useAsyncData(
//     "/posts", () => queryContent("/posts")
//         .only(["_path", "title", "description", "date", "tags", "draft",])
//         .where([{ title: { $containsAny: searchTypes.value, }, }, { type: 'post' }, { draft: { $ne: true } }])
//         .sort({ date: -1 })
//         .find()
//   );
// });

const flatten = (tags, key) => {
  let _tags = tags
    .map((tag) => {
      let _tag = tag;
      if (tag[key]) {
        let flattened = flatten(tag[key]);
        _tag = flattened;
      }
      return _tag;
    })
    .flat(1);
  return _tags;
};

const articleTags = [...new Set(flatten(tagsList.value, "tags"))];
const { ctrl_Slash } = useMagicKeys();

// watch(ctrl_Slash, (v) => {
//   if (v) {
//     searchTypeRef.value.focus();
//     refreshPosts()
//   }
// });

const config = useRuntimeConfig().public

useHead({
  title: `Blog — ${config.siteTitle}`,
  meta: [
    {
      name: "description",
      content: config.siteDesc,
    },
    {
      name: "og:title",
      content: `Blog — ${config.siteTitle}`,
    },
    {
      name: "og:description",
      content: config.siteDesc,
    },
    {
      name: "og:image",
      content: config.cover,
    },
  ],
});
</script>

<template>
    <main>
        <div class="blog-layout">
            <div class="blog-layout__content">
                <div class="content-area flow">
                    <h1>Blog</h1>
                    <div class="top-wrap">
                        <!-- <input
                        ref="searchTypeRef"
                        type="text"
                        placeholder="Search article (ctrl + /)"
                        v-model="searchType"
                        @focus="refreshPosts()"
                        class="input-search"
                        /> -->

                        <BaseButton @click="showTags = !showTags" variant="outline" size="md" color="primary">
                            Tags <Icon :class="[showTags ? 'rotate-180' : '']" name="ri:arrow-down-line" />
                        </BaseButton>
                    </div>

                    <div class="tag-list" v-if="showTags">
                        <span class="tag-item" v-for="(t, i) in articleTags" :key="i">
                            <BaseButton :to="'/tags/' + t" variant="solid" size="sm" color="primary">
                                {{ t }}
                            </BaseButton>
                        </span>
                    </div>

                    <div v-if="postsList.length > 0 && !isPostsLoading" class="post-item">
                        <template v-for="(post, index) in postsList" :key="index">
                            <TagPosts :data="post" />
                        </template>
                    </div>

                    <div v-if="postsList.length <= 0 && !isPostsLoading">
                        No articles.
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.top-wrap {
    display: flex;
    justify-content: space-between;
    margin-block-start: 2rem;

    @media (max-width: 480px) {
      flex-direction: column;
      margin-block-start: 1rem;
    }

    .input-search {
      color: var(--font-color);
      background-color: var(--background-border-color);
      background-clip: padding-box;
      border: 2px solid var(--color-primary-hover-t);
      border-radius: 0.25rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        @media (max-width: 480px) {
          margin-block-end: 1rem;
        }

        &::placeholder {
          font-size: var(--sizing-xl);
          color: var(--font-color);
          text-align: center;
          opacity: 0.8;
        }

        &:focus {
          color: var(--font-color);
          background-color: var(--background-border-color);
          border-color: var(--color-primary);
          outline: 0;
          box-shadow: 0 0 0 0.2rem var(--color-primary-hover-t);
        }

        &:disabled,
        &[readonly] {
          background-color: var(--color-middle-gray);
          opacity: 1;
        }
    }
}
.tag-list {
    background-color: var(--background-border-color);
    padding: var(--sizing-md);
    border-radius: var(--sizing-md);
    display: flex;
    flex-wrap: wrap;

    .tag-item {
        margin: var(--sizing-sm);
        border-radius: var(--sizing-md);
    }
}

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
