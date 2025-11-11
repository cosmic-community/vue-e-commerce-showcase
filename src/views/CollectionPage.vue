<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      <p class="mt-4 text-gray-600">Loading collection...</p>
    </div>

    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <p class="text-red-600">{{ error }}</p>
      <router-link to="/" class="mt-4 inline-block text-blue-600 hover:text-blue-700">
        ← Back to home
      </router-link>
    </div>

    <div v-else-if="!collection" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <p class="text-gray-600">Collection not found.</p>
      <router-link to="/" class="mt-4 inline-block text-blue-600 hover:text-blue-700">
        ← Back to home
      </router-link>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-link to="/" class="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to home
      </router-link>

      <!-- Collection Header -->
      <div class="mb-12">
        <div v-if="collection.metadata.featured_image" class="relative aspect-[21/9] rounded-lg overflow-hidden mb-6">
          <img 
            :src="`${collection.metadata.featured_image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`"
            :alt="collection.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              {{ collection.metadata.collection_name }}
            </h1>
            <p v-if="collection.metadata.description" class="text-xl text-white/90 max-w-2xl">
              {{ collection.metadata.description }}
            </p>
          </div>
        </div>
        
        <div v-else>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {{ collection.metadata.collection_name }}
          </h1>
          <p v-if="collection.metadata.description" class="text-xl text-gray-600 max-w-2xl">
            {{ collection.metadata.description }}
          </p>
        </div>
      </div>

      <!-- Products -->
      <div v-if="products.length === 0" class="text-center py-12">
        <p class="text-gray-600">No products in this collection yet.</p>
      </div>

      <div v-else>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          Products ({{ products.length }})
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in products" 
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getCollection, getProductsByCollection } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard.vue'
import type { Collection, Product } from '@/types'

const route = useRoute()
const collection = ref<Collection | null>(null)
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadCollection = async () => {
  loading.value = true
  error.value = null
  
  try {
    const slug = route.params.slug as string
    const collectionData = await getCollection(slug)
    
    if (!collectionData) {
      error.value = 'Collection not found'
      return
    }
    
    collection.value = collectionData as Collection
    
    // Load products for this collection
    const productsData = await getProductsByCollection(collection.value.id)
    products.value = productsData as Product[]
  } catch (err) {
    console.error('Error loading collection:', err)
    error.value = 'Failed to load collection. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(loadCollection)

watch(() => route.params.slug, loadCollection)
</script>