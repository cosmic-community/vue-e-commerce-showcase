<template>
  <router-link 
    :to="`/products/${product.slug}`"
    class="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
  >
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <img 
        v-if="product.metadata.product_images && product.metadata.product_images.length > 0"
        :src="`${product.metadata.product_images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
      <div v-if="product.metadata.sale_price" class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
        Sale
      </div>
      <div v-if="!product.metadata.in_stock" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <span class="text-white font-semibold text-lg">Out of Stock</span>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {{ product.metadata.product_name }}
      </h3>
      
      <div class="flex items-center gap-2">
        <span v-if="product.metadata.sale_price" class="text-lg font-bold text-red-600">
          ${{ product.metadata.sale_price.toFixed(2) }}
        </span>
        <span 
          :class="[
            'text-lg font-bold',
            product.metadata.sale_price ? 'line-through text-gray-400 text-sm' : 'text-gray-900'
          ]"
        >
          ${{ product.metadata.price.toFixed(2) }}
        </span>
      </div>
      
      <div v-if="product.metadata.collections && product.metadata.collections.length > 0" class="mt-2 flex flex-wrap gap-1">
        <span 
          v-for="collection in product.metadata.collections.slice(0, 2)" 
          :key="collection.id"
          class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
        >
          {{ collection.metadata.collection_name }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()
</script>