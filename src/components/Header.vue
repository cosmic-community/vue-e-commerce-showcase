<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <router-link 
          to="/" 
          class="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
        >
          🛍️ Vue Shop
        </router-link>
        
        <nav class="flex items-center gap-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Products
          </router-link>
          <div v-if="collections.length > 0" class="relative group">
            <button class="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-1">
              Collections
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div class="py-2">
                <router-link
                  v-for="collection in collections"
                  :key="collection.id"
                  :to="`/collections/${collection.slug}`"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {{ collection.metadata.collection_name }}
                </router-link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCollections } from '@/lib/cosmic'
import type { Collection } from '@/types'

const collections = ref<Collection[]>([])

onMounted(async () => {
  try {
    collections.value = await getCollections() as Collection[]
  } catch (error) {
    console.error('Error loading collections:', error)
  }
})
</script>