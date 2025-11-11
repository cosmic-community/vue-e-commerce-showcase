<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      <p class="mt-4 text-gray-600">Loading product...</p>
    </div>

    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <p class="text-red-600">{{ error }}</p>
      <router-link to="/" class="mt-4 inline-block text-blue-600 hover:text-blue-700">
        ← Back to products
      </router-link>
    </div>

    <div v-else-if="!product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <p class="text-gray-600">Product not found.</p>
      <router-link to="/" class="mt-4 inline-block text-blue-600 hover:text-blue-700">
        ← Back to products
      </router-link>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-link to="/" class="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to products
      </router-link>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Image Gallery -->
        <div>
          <div class="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              v-if="product.metadata.product_images && product.metadata.product_images.length > 0"
              :src="`${product.metadata.product_images[selectedImageIndex].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`"
              :alt="product.title"
              class="w-full h-full object-cover"
            />
            <div v-if="product.metadata.sale_price" class="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Sale
            </div>
          </div>
          
          <div v-if="product.metadata.product_images && product.metadata.product_images.length > 1" class="grid grid-cols-4 gap-4">
            <button
              v-for="(image, index) in product.metadata.product_images"
              :key="index"
              @click="selectedImageIndex = index"
              :class="[
                'relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors',
                selectedImageIndex === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
              ]"
            >
              <img 
                :src="`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`"
                :alt="`${product.title} - Image ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ product.metadata.product_name }}
          </h1>

          <div class="flex items-center gap-3 mb-6">
            <div v-if="product.metadata.sale_price" class="text-3xl font-bold text-red-600">
              ${{ product.metadata.sale_price.toFixed(2) }}
            </div>
            <div 
              :class="[
                'text-3xl font-bold',
                product.metadata.sale_price ? 'line-through text-gray-400 text-xl' : 'text-gray-900'
              ]"
            >
              ${{ product.metadata.price.toFixed(2) }}
            </div>
          </div>

          <div v-if="product.metadata.sale_price" class="mb-6 inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
            Save ${{ (product.metadata.price - product.metadata.sale_price).toFixed(2) }}
          </div>

          <div v-if="product.metadata.collections && product.metadata.collections.length > 0" class="mb-6 flex flex-wrap gap-2">
            <router-link
              v-for="collection in product.metadata.collections"
              :key="collection.id"
              :to="`/collections/${collection.slug}`"
              class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              {{ collection.metadata.collection_name }}
            </router-link>
          </div>

          <div 
            v-if="product.metadata.description"
            class="prose prose-gray max-w-none mb-8"
            v-html="product.metadata.description"
          ></div>

          <div class="mb-8 space-y-3">
            <div v-if="product.metadata.sku" class="flex items-center text-gray-600">
              <span class="font-medium mr-2">SKU:</span>
              <span>{{ product.metadata.sku }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium mr-2">Availability:</span>
              <span :class="product.metadata.in_stock ? 'text-green-600' : 'text-red-600'">
                {{ product.metadata.in_stock ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>
          </div>

          <!-- Reviews Section -->
          <div v-if="reviews.length > 0" class="border-t border-gray-200 pt-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            <div class="space-y-4">
              <ReviewCard 
                v-for="review in reviews" 
                :key="review.id"
                :review="review"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct, getProductReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard.vue'
import type { Product, Review } from '@/types'

const route = useRoute()
const product = ref<Product | null>(null)
const reviews = ref<Review[]>([])
const selectedImageIndex = ref(0)
const loading = ref(true)
const error = ref<string | null>(null)

const loadProduct = async () => {
  loading.value = true
  error.value = null
  
  try {
    const slug = route.params.slug as string
    const productData = await getProduct(slug)
    
    if (!productData) {
      error.value = 'Product not found'
      return
    }
    
    product.value = productData as Product
    
    // Load reviews for this product
    const reviewsData = await getProductReviews(product.value.id)
    reviews.value = reviewsData as Review[]
  } catch (err) {
    console.error('Error loading product:', err)
    error.value = 'Failed to load product. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(loadProduct)

watch(() => route.params.slug, loadProduct)
</script>