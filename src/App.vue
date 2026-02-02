<script setup lang="ts">
// Global composables
import { RouterView } from 'vue-router';
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- Navbar persistante -->
    <Navbar />
    
    <!-- Contenu principal -->
    <main class="flex-grow-1">
      <RouterView />
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
@import '@/assets/css/main.css';
</style>
