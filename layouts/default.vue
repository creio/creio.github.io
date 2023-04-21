<script setup lang="ts">
// const config = useRuntimeConfig().public

useHead({
    script: [
        {
            async: true,
            src: '/js/main.js',
            defer: true,
            type: 'text/javascript'
        },
    ],
});
</script>

<template>
    <div class="app-layout">
        <BaseNavigation />
        <slot />
        <BaseFooter />
    </div>
</template>
