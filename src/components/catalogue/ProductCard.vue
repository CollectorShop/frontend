<script setup lang="ts">
import { type Product } from '@/types/catalogue';
import { useRouter } from 'vue-router';

interface Props {
  product: Product;
}

const props = withDefaults(defineProps<Props>(), {});

const router = useRouter();

const goToProduct = () => {
  router.push(`/product/${props.product.id}`);
};
</script>

<template>
  <div class="card h-100 shadow-sm">
    <div class="card-img-top position-relative overflow-hidden" style="height: 200px;">
      <img 
        :src="product.images[0] || '/placeholder-vintage.jpg'" 
        :alt="product.title"
        class="w-100 h-100 object-fit-cover"
        loading="lazy"
      />
      <span 
        v-if="product.rarity" 
        class="position-absolute top-0 start-0 badge bg-warning m-2 text-dark fw-bold"
      >
        {{ product.rarity.toUpperCase() }}
      </span>
    </div>
    
    <div class="card-body d-flex flex-column p-3">
      <h6 class="card-title fw-bold mb-2 text-truncate" :title="product.title">
        {{ product.title }}
      </h6>
      
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="h5 text-primary fw-bold">€{{ product.price.toFixed(0) }}</span>
        <span class="badge bg-secondary">
          {{ product.condition.replace('_', ' ') }}
        </span>
      </div>
      
      <small class="text-muted mb-3">{{ product.category }}</small>
      
      <button 
        class="btn btn-outline-primary w-100 mt-auto"
        @click="goToProduct"
      >
        Voir l'objet
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-img-top:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
