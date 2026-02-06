<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { type Product } from '@/types/catalogue'

const route = useRoute()
const product = ref<Product | null>(null)
const loading = ref(true)

const mockDetail: Product = {
  id: route.params.id as string,
  title: "Air Jordan 1 Retro High OG 'Chicago Reimagined'",
  description:
    "État exceptionnel, boîte d'origine incluse. Taille 42 EU, jamais portée en extérieur.",
  price: 285,
  category: 'Sneakers',
  condition: 'like_new',
  images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
  sellerId: 'user1',
  createdAt: '2026-01-08T10:30:00Z',
  rarity: 'rare',
}

onMounted(() => {
  // Mock API call
  setTimeout(() => {
    product.value = mockDetail
    loading.value = false
  }, 600)
})

const currentImage = ref(0)
</script>

<template>
  <div v-if="loading" class="container py-5">
    <div
      class="spinner-border text-primary mx-auto d-block"
      style="width: 3rem; height: 3rem"
    ></div>
  </div>

  <div v-else-if="product" class="container py-4">
    <button class="btn btn-outline-secondary mb-4">
      <i class="bi bi-arrow-left me-2"></i>
      Retour au catalogue
    </button>

    <div class="row g-5">
      <!-- Images Gallery -->
      <div class="col-lg-6">
        <div class="position-relative">
          <img
            :src="product.images[currentImage] || '/placeholder-vintage.jpg'"
            class="img-fluid rounded shadow-lg"
            :alt="product.title"
          />

          <div v-if="product.images.length > 1" class="position-absolute bottom-0 end-0 p-3">
            <div class="d-flex gap-2">
              <button
                v-for="(img, index) in product.images.slice(0, 4)"
                :key="index"
                class="border rounded p-1"
                :class="{ active: currentImage === index }"
                @click="currentImage = index"
                style="width: 60px; height: 60px"
              >
                <img :src="img" class="w-100 h-100 object-fit-cover rounded" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="col-lg-6">
        <div class="sticky-top" style="top: 20px">
          <h1 class="display-5 fw-bold mb-3">{{ product.title }}</h1>

          <div class="d-flex align-items-baseline mb-4">
            <span class="display-6 text-primary fw-bold">€{{ product.price.toFixed(0) }}</span>
            <span class="badge bg-warning text-dark ms-3 fs-6">{{
              product.rarity?.toUpperCase()
            }}</span>
          </div>

          <div class="mb-4">
            <h6 class="text-muted mb-2">État</h6>
            <span class="badge bg-success fs-6 px-3 py-2">{{
              product.condition.replace('_', ' ')
            }}</span>
          </div>

          <div class="mb-4">
            <h6 class="text-muted mb-2">Catégorie</h6>
            <span class="badge bg-secondary fs-6 px-3 py-2">{{ product.category }}</span>
          </div>

          <div class="mb-5">
            <h6 class="fw-bold mb-3">Description</h6>
            <p class="lead">{{ product.description }}</p>
          </div>

          <!-- CTA Buttons -->
          <div class="row g-3 mb-4">
            <div class="col-8">
              <button class="btn btn-primary btn-lg w-100">
                <i class="bi bi-cart-plus me-2"></i>
                Ajouter au panier
              </button>
            </div>
            <div class="col-4">
              <button class="btn btn-success btn-lg w-100">
                <i class="bi bi-lightning-charge me-2"></i>
                Acheter maintenant
              </button>
            </div>
          </div>

          <!-- Seller Info -->
          <div class="card border-0 bg-light">
            <div class="card-body">
              <h6 class="card-title mb-2">Vendu par</h6>
              <p class="mb-1"><strong>VintageHunter42</strong></p>
              <small class="text-muted">Membre depuis 2 ans • 98% satisfaction (124 ventes)</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
