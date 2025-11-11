<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Quality Products
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl">
          Shop our curated collection of premium products with verified customer reviews
        </p>
      </div>
    </section>

    <!-- Collections Section -->
    <section v-if="collections.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Collections</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CollectionCard 
          v-for="collection in collections" 
          :key="collection.id"
          :collection="collection"
        />
      </div>
    </section>

    <!-- Products Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">All Products</h2>
      
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Loading products...</p>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <div v-else-if="products.length === 0" class="text-center py-12">
        <p class="text-gray-600">No products found.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard 
          v-for="product in products" 
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProducts, getCollections } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard.vue'
import CollectionCard from '@/components/CollectionCard.vue'
import type { Product, Collection } from '@/types'

const products = ref<Product[]>([])
const collections = ref<Collection[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const [productsData, collectionsData] = await Promise.all([
      getProducts(),
      getCollections()
    ])
    
    products.value = productsData as Product[]
    collections.value = collectionsData as Collection[]
  } catch (err) {
    console.error('Error loading data:', err)
    error.value = 'Failed to load products. Please try again later.'
  } finally {
    loading.value = false
  }
})
</script>