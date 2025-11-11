<template>
  <router-link 
    :to="`/collections/${collection.slug}`"
    class="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
  >
    <div class="relative aspect-[16/9] overflow-hidden bg-gray-100">
      <img 
        v-if="collection.metadata.featured_image"
        :src="`${collection.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`"
        :alt="collection.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {{ collection.metadata.collection_name }}
      </h3>
      
      <p v-if="collection.metadata.description" class="text-gray-600 line-clamp-2">
        {{ collection.metadata.description }}
      </p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Collection } from '@/types'

defineProps<{
  collection: Collection
}>()
</script>