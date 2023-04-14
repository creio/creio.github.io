<script setup lang="ts">
const props = defineProps({
  error: Object,
});
const error = useError();
if (error.value.statusCode === 404 || "404") {
  error.value.message = "Oops! Page not found";
}
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
    <NuxtLayout>
        <main class="article-page">
            <article class="article-layout">
                <div class="h1-heading">{{ error.statusCode }}</div>

                <p class="text-2xl mb-6">
                    {{ error.statusCode === 404 || "404" ? error.message : "Oops! Error" }}
                </p>
                <BaseButton to="/" variant="outline" size="md" color="primary">
                    <Icon name="ri:arrow-left-line" /> <span>home</span>
                </BaseButton>
            </article>
        </main>
    </NuxtLayout>
</template>

<style lang="scss" scoped>
.article-layout {
    text-align: center;
}
</style>
