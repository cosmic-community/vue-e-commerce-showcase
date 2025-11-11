<template>
  <div id="app" class="min-h-screen">
    <Header />
    <main>
      <router-view />
    </main>
    <CosmicBadge :bucket-slug="bucketSlug" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Header from './components/Header.vue'
import CosmicBadge from './components/CosmicBadge.vue'

const bucketSlug = computed(() => import.meta.env.VITE_COSMIC_BUCKET_SLUG || '')
</script>