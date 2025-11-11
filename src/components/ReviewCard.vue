<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h4 class="font-semibold text-gray-900">{{ review.metadata.reviewer_name }}</h4>
        <div class="flex items-center gap-2 mt-1">
          <StarRating :rating="parseInt(review.metadata.rating.key)" />
          <span v-if="review.metadata.verified_purchase" class="text-xs text-green-600 font-medium">
            ✓ Verified Purchase
          </span>
        </div>
      </div>
    </div>
    
    <p class="text-gray-700 leading-relaxed">
      {{ review.metadata.review_text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '@/types'
import StarRating from './StarRating.vue'

defineProps<{
  review: Review
}>()
</script>