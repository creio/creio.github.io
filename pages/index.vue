<script setup lang="ts">
import { formatDate } from '../utils/formatDate';

const config = useRuntimeConfig().public

const { data } = await useAsyncData('posts', () => queryContent('/posts')
    .where([{ type: 'post' }, { draft: { $ne: true } }])
    .sort({ date: -1 })
    .limit(4)
    .find());

useHead({
  title: `${config.siteTitle}. I’m root :)`,
  meta: [
    {
      name: "description",
      content: config.siteDesc,
    },
    {
      name: "og:title",
      content: `${config.siteTitle}. I’m root :)`,
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

// const { data: repoList, pending: isReposLoading } = await useAsyncData(
//   "/gihub",
//   () => $fetch("/api/github")
// );
// const repoListSorted = computed(() => {
//   return repoList.value
//     // .sort((a, b) => new Date(b.created) - new Date(a.created))
//     .sort((a, b) => b.stars - a.forks)
//     .slice(0, 4)
// });
</script>

<template>
  <main class="home-page">
    <div class="home-layout">
      <div class="home-layout__hero">
        <BaseImage :src="config.profileImage" class="profile-image" :alt="config.siteTitle" />
        <div class="home-greeting flow">
          <h1 class="home-hello">Hi!</h1>
          <p>
            <strong>Я Alex</strong>, более 5 лет веду и поддерживаю свободный проект <NuxtLink target="_blank" to="https://ctlos.github.io">Ctlos</NuxtLink>. Иногда публикую видео на <NuxtLink target="_blank" to="https://youtube.com/c/creioyt?sub_confirmation=1">YouTube</NuxtLink>, подпишись.
          </p>
          <p>
            Сторонник открытого Интернета. Интересуюсь блокчейном и технологиями вокруг него. Обитаю в данном чате: <NuxtLink target="_blank" to="https://t.me/ctlos">@ctlos</NuxtLink>.
          </p>
          <div class="button-group">
            <BaseButton to="/wow" variant="outline" size="md" color="primary">
              <span>клик</span> <Icon name="ri:arrow-right-line" />
            </BaseButton>
          </div>
        </div>
      </div>
      <hr />
      <div class="home-layout__content">
        <div class="sidebar-area flow">
          <h2>Blog</h2>
          <p>В основном о linux.</p>
        </div>
        <div class="content-area flow">
          <ul class="article-list">
            <li v-for="post in data" :key="post.title">
              <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
              &mdash; {{ formatDate(post.date) }}
            </li>
          </ul>
          <div class="button-group">
            <BaseButton to="/posts" variant="outline" size="md" color="primary">
              <span>more posts</span> <Icon name="ri:arrow-right-line" />
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- <hr /> -->

      <!-- <div class="home-layout__content">
        <div class="sidebar-area flow">
          <h2>Github</h2>
          <p>Поставь звёздочек и подпишись.</p>
        </div>
        <div class="content-area flow">
          <div v-if="isReposLoading">Loading...</div>
          <div v-else class="gh-cards">
            <div class="gh-card" v-for="(item, index) in repoListSorted" :key="index">
              <RepoCard :props="item" />
            </div>
          </div>
          <div class="button-group">
            <BaseButton to="https://github.com/creio" target="_blank" variant="outline" size="md" color="primary">
              <span>more repos</span> <Icon name="ri:arrow-right-line" />
            </BaseButton>
          </div>
        </div>
      </div> -->

    </div>
  </main>
</template>

<style lang="scss" scoped>
.gh-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    grid-column-gap: var(--sizing-md);

    @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
    }

    .gh-card {
        color: var(--font-color);
        background-color: var(--background-border-color);
        border: 1px solid var(--border-color);
        border-radius: var(--sizing-md);
        margin-block-start: var(--sizing-md);
        padding: var(--sizing-md);

        &:hover {
            border-color: var(--color-primary);
        }
        & a {
            text-decoration: none;
        }
    }
}

.home-page {
  padding: 0;

  hr {
    grid-column: 1 / span 4;
    margin-block-start: 3rem;
    margin-block-end: 3rem;
  }
}
.home-layout {
  &__hero {
    max-width: var(--max-width);
    margin-inline: auto;
    margin-block-start: 2rem;
    margin-block-end: 2rem;

    @media (min-width: 1053px) {
      grid-template-columns: repeat(28, 1fr);
      grid-template-rows: repeat(3, 1fr);
      margin-block-start: 6rem;
      margin-block-end: 6rem;
    }
    @media (max-width: 1052px) {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, auto);
      padding: 2rem;
      gap: var(--sizing-xxl) var(--sizing-xxl);
    }

    @media (max-width: 715px) {
      padding: 1rem;
    }

    @media (min-width: 500px) {
      display: grid;
    }
  }

  &__content {
    max-width: var(--max-width);
    margin-inline: auto;
    margin-block-start: 2rem;
    margin-block-end: 2rem;

    @media (min-width: 1053px) {
      grid-template-columns: repeat(28, 1fr);
      margin-block-start: 10rem;
      margin-block-end: 10rem;
      display: grid;
    }

    @media (max-width: 1052px) {
      padding: 2rem;
    }

    @media (max-width: 715px) {
      padding: 1rem;
    }

    @media (min-width: 500px) {
    }
  }

  .profile-image {
    z-index: 1;
    overflow: hidden;
    border-radius: 10px;

    @media (min-width: 1053px) {
      grid-column: 14 / -2;
      grid-row: 1 / span 3;
      aspect-ratio: 1 / 1.125;
      align-self: center;
    }
    @media (max-width: 1052px) and (min-width: 501px) {
      grid-column: 1 / span 2;
      grid-row: 1 / span 2;
      aspect-ratio: 1 / 1.125;
    }

    @media (max-width: 500px) {
      aspect-ratio: 1.4;
    }

    :deep(img) {
      mix-blend-mode: multiply;
      z-index: 2;
      position: relative;
      opacity: 0.8;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      -o-object-fit: cover;
      object-fit: cover;
      -o-object-position: center;
      object-position: center;
      font-family: 'object-fit: cover; object-position: center';
      width: 100%;
      height: 100%;
    }

    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background: var(--gradient-1);
      mix-blend-mode: normal;
      opacity: 0.8;
      z-index: 3;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: var(--image-background);
      mix-blend-mode: screen;
      opacity: 0.8;
      z-index: 1;
    }
  }
  .home-hello {
    color: var(--color-primary);
    z-index: 2;
    position: relative;
    font-size: clamp(var(--size-step-4), 8vw, 100px);
    line-height: 1;

    @media (min-width: 1053px) {
      text-indent: -0.5rem;
    }

    @media (max-width: 500px) {
      margin-top: -0.5em;
    }
  }

  .home-greeting {
    z-index: 2;
    align-self: center;
    max-width: 65ch;

    @media (min-width: 1053px) {
      grid-column: 2 / span 10;
      grid-row: 1 / span 3;
      align-self: center;
    }
    @media (max-width: 1052px) {
      grid-column: 2 / span 3;
      grid-row: 2;
    }
  }

  .article-list {
    list-style: none;
    padding: 0;
  }

  .content-area {
    grid-column: 9 / -2;
  }

  .sidebar-area {
    grid-column: 2 / span 6;
  }

  .button-group {
    --flow-space: 2.5em;
    display: flex;
    align-items: center;
    gap: var(--sizing-md);
  }
}
</style>
