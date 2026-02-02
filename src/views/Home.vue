<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type Product } from '@/types/catalogue';
import ProductCard from '@/components/catalogue/ProductCard.vue';
import CategoryFilter from '@/components/catalogue/CategoryFilter.vue';

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Mock data pour POC - Sprint 1
const mockProducts: Product[] = [
  {
    id: '1',
    title: "Air Jordan 1 Retro High OG 'Chicago Reimagined'",
    price: 285,
    category: 'Sneakers',
    condition: 'like_new',
    images: ['/api/placeholder/300/200'],
    sellerId: 'user1',
    createdAt: '2026-01-08T10:30:00Z',
    rarity: 'rare'
  },
  {
    id: '2', 
    title: "Funko Pop Marvel Spider-Man (GitD) #481",
    price: 45,
    category: 'Figurines',
    condition: 'new',
    images: ['/api/placeholder/300/200'],
    sellerId: 'user2',
    createdAt: '2026-01-07T14:20:00Z',
    rarity: 'common'
  }
] as Product[];

onMounted(() => {
  // Simule fetch API backend
  setTimeout(() => {
    products.value = mockProducts;
    loading.value = false;
  }, 800);
});
</script>

<template>
  <div class="container-fluid py-4">
    <!-- Hero Section -->
    <div class="row mb-5">
      <div class="col-12 text-center">
        <h1 class="display-4 fw-bold text-primary mb-3">
          Collector.shop
        </h1>
        <p class="lead text-muted mb-4">
          La marketplace des objets vintage entre passionnés
        </p>
        <div class="row justify-content-center g-3">
          <div class="col-md-4 col-lg-3">
            <button class="btn btn-primary btn-lg w-100">
              Parcourir le catalogue
            </button>
          </div>
          <div class="col-md-4 col-lg-3">
            <button class="btn btn-outline-secondary btn-lg w-100">
              Devenir vendeur
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters + Grid -->
    <div class="row">
      <div class="col-lg-3 col-xl-2">
        <CategoryFilter />
      </div>
      
      <div class="col-lg-9 col-xl-10">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h3 mb-0">Catalogue</h2>
          <div class="input-group input-group-sm" style="max-width: 300px;">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input 
              type="search" 
              class="form-control" 
              placeholder="Rechercher un objet vintage..."
            />
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
        </div>

        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div v-else class="row g-4">
          <div v-for="product in products" :key="product.id" class="col-sm-6 col-md-4 col-lg-3">
            <ProductCard :product="product" />
          </div>
          
          <div v-if="products.length === 0" class="col-12 text-center py-5">
            <h5>Aucun objet trouvé</h5>
            <p>Revenez plus tard pour découvrir de nouvelles pépites !</p>
          </div>
        </div>

        <!-- Pagination (future) -->
        <nav v-if="products.length > 0" class="mt-5">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link">Précédent</a>
            </li>
            <li class="page-item active">
              <a class="page-link">1</a>
            </li>
            <li class="page-item">
              <a class="page-link">Suivant</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
