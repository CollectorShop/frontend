<script setup lang="ts">
import { useCatalogueStore } from '@/stores/catalogue'

const catalogueStore = useCatalogueStore()

const conditions = [
  { value: 'new', label: 'Neuf', icon: '✨' },
  { value: 'like_new', label: 'Comme neuf', icon: '⭐' },
  { value: 'good', label: 'Très bon état', icon: '👍' },
  { value: 'fair', label: 'Bon état', icon: '👌' },
]
</script>

<template>
  <div class="card sticky-top" style="top: 100px">
    <div class="card-header bg-light">
      <h6 class="mb-0 fw-bold">Filtres</h6>
    </div>

    <div class="card-body p-3">
      <!-- Catégories -->
      <div class="mb-4">
        <h6 class="fw-bold mb-2">Catégories</h6>
        <div class="list-group list-group-flush">
          <button
            v-for="cat in catalogueStore.categories"
            :key="cat.id"
            class="list-group-item list-group-item-action d-flex align-items-center p-2"
            :class="{
              'active bg-primary text-white': catalogueStore.filters.category === cat.slug,
              'hover-primary': catalogueStore.filters.category !== cat.slug,
            }"
            @click="catalogueStore.setFilters({ category: cat.slug })"
          >
            <span class="me-2 fs-5">{{ cat.icon }}</span>
            {{ cat.name }}
          </button>
        </div>
        <button
          class="btn btn-sm btn-link p-0 mt-1 text-muted"
          @click="catalogueStore.setFilters({ category: null })"
        >
          Toutes les catégories
        </button>
      </div>

      <!-- Prix -->
      <div class="mb-4">
        <h6 class="fw-bold mb-2">Prix</h6>
        <div class="row g-2 mb-2">
          <div class="col-6">
            <label class="form-label fs-6 mb-1">Min</label>
            <input
              v-model.number="catalogueStore.filters.minPrice"
              type="number"
              class="form-control form-control-sm"
              placeholder="0"
            />
          </div>
          <div class="col-6">
            <label class="form-label fs-6 mb-1">Max</label>
            <input
              v-model.number="catalogueStore.filters.maxPrice"
              type="number"
              class="form-control form-control-sm"
              placeholder="1000"
            />
          </div>
        </div>
      </div>

      <!-- État -->
      <div>
        <h6 class="fw-bold mb-2">État</h6>
        <div class="d-grid gap-2">
          <div v-for="condition in conditions" :key="condition.value" class="form-check">
            <input
              class="form-check-input"
              :id="`cond-${condition.value}`"
              type="checkbox"
              :value="condition.value"
              v-model="catalogueStore.filters.condition"
            />
            <label
              :for="`cond-${condition.value}`"
              class="form-check-label d-flex align-items-center"
            >
              <span class="me-2">{{ condition.icon }}</span>
              {{ condition.label }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-primary:hover {
  background-color: rgba(13, 110, 253, 0.1) !important;
  border-color: #0d6efd !important;
}
</style>
