<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';

const user = ref<{ name: string; isLogged: boolean } | null>(null);
const userStore = useUserStore();
const isAuth = computed(() => userStore.isAuthenticated);
const logout = () => userStore.logout();

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand fw-bold fs-3 text-primary" to="/">
        <i class="bi bi-gem me-2"></i>
        Collector.shop
      </router-link>

      <!-- Toggle mobile -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu principal -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Catalogue</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Vendre</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Catégories</a>
          </li>
        </ul>

        <!-- Recherche -->
        <form class="d-flex me-3">
          <div class="input-group input-group-sm">
            <input 
              class="form-control" 
              type="search" 
              placeholder="Rechercher un objet vintage..."
            />
            <button class="btn btn-outline-secondary">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </form>

        <!-- Actions utilisateur -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="bi bi-heart me-1"></i>
              Favoris (0)
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="bi bi-cart me-1"></i>
              Panier (0)
            </a>
          </li>
          
          <!-- Connecté -->
          <template v-if="isAuth">
            <li class="nav-item dropdown">
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                {{ user?.name }}
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Mon profil</a></li>
                <li><a class="dropdown-item" href="#">Mes ventes</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" @click="logout">Déconnexion</a></li>
              </ul>
            </li>
          </template>
          
          <!-- Non connecté -->
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">
                Connexion
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link btn btn-outline-primary ms-2" to="/register">
                S'inscrire
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
