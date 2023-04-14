<script setup lang="ts">
useHead({
  title: 'About',
});
</script>

<template>
  <main>
    <article class="about-layout">
      <div class="about-content flow">
        <h1>About Me</h1>
        <p>
          Lorem...
        </p>

        <ContactForm />
      </div>
    </article>
  </main>
</template>

<style lang="scss" scoped>
.about-layout {
  max-width: var(--max-width);
  margin-inline: auto;
  margin-block-start: 2rem;
  margin-block-end: 2rem;

  @media (min-width: 1053px) {
    grid-template-columns: repeat(18, 1fr);
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

  .about-content {
    @media (min-width: 1053px) {
      grid-column: 2 / span 12;
    }
    @media (max-width: 1052px) {
      grid-column: 1 / span 4;
    }
  }
}
</style>
