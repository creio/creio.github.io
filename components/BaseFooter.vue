<script setup lang="ts">
const config = useRuntimeConfig().public

const date = ref<Date>(new Date());
const theYear = computed<string>(() => {
  return date.value.getFullYear().toString();
});
</script>

<template>
  <footer class="base-footer">
    <div class="base-footer__layout">
      <div class="copyright-area copyright-block flow">
        <div class="copyright-line">&copy; {{ theYear }}. Gen: <a target="_blank" href="https://nuxt.com" rel="nofollow">Nuxt</a></div>
      </div>
      <div class="meta-area flow" v-if="config.socials">
        <ul class="social-icons">
          <li v-if="config.socials?.github">
            <a class="footer-icon" rel="me" target="_blank" :href="`https://github.com/${config.socials?.github}`">
                <Icon name="ph:github-logo-bold" />
            </a>
          </li>
          <li v-if="config.socials?.telegram">
            <a class="footer-icon" rel="me" target="_blank" :href="`https://t.me/${config.socials?.telegram}`">
                <Icon name="ph:telegram-logo-bold" />
            </a>
          </li>
          <li v-if="config.socials?.youtube">
            <a class="footer-icon" rel="me" target="_blank" :href="`https://youtube.com/${config.socials?.youtube}`">
                <Icon name="ph:youtube-logo-bold" />
            </a>
          </li>
          <li v-if="config.socials?.vk">
            <a class="footer-icon" rel="me" target="_blank" :href="`https://vk.com/${config.socials?.vk}`">
                <Icon name="akar-icons:vk-fill" />
            </a>
          </li>
          <li>
            <a class="footer-icon" :href="`#`">
                <Icon name="ph:arrow-up" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.base-footer {
  font-weight: 100;
  grid-area: 'app-footer';
  padding: 2rem 0;
  border-top: 1px solid var(--border-color);

  @media (max-width: 1052px) {
    padding: 2rem;
  }

  @media (max-width: 715px) {
    padding: 1rem;
  }

  &__layout {
    max-width: var(--max-width);
    margin-inline: auto;
    display: flex;
    flex-direction: column-reverse;

    @media (min-width: 767px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--sizing-xxl);
    }

    @media (min-width: 1053px) {
      grid-template-columns: repeat(28, 1fr);
      gap: 0;
    }

    @media (max-width: 766px) {
      .meta-area {
        margin-block-end: 1.5rem;
      }
    }

    .copyright-area {
      max-width: 85ch;

      @media (min-width: 767px) {
        grid-column: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      @media (min-width: 1053px) {
        grid-column: 2 / span 14;
      }

      .copyright-line {
        font-size: var(--size-step--1);
      }
    }

    .meta-area {
      // display: flex;
      // align-items: flex-start;
      // flex-direction: column;
      // gap: 1rem;

      @media (min-width: 767px) {
        grid-column: 2;
      }

      @media (min-width: 1053px) {
        grid-column: 18 / -2;
      }
    }
  }

  .social-icons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;

    @media (min-width: 767px) {
        justify-content: flex-end;
    }
  }
  a.footer-icon {
    line-height: 1;
    font-size: var(--size-step--1);

    .icon {
      font-size: var(--size-step-1);
      color: var(--color-middle-gray);
    }

    &:hover {
      .icon {
        color: var(--color-primary);
      }
    }
  }
}
</style>
