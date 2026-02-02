<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    userStore.error = 'Les mots de passe ne correspondent pas';
    return;
  }
  
  const success = await userStore.register(
    form.value.email, 
    form.value.password, 
    form.value.name
  );
  
  if (success) {
    router.push('/');
  }
};
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5 col-xl-4">
        <div class="card shadow-lg border-0">
          <div class="card-body p-5">
            <div class="text-center mb-5">
              <router-link to="/" class="d-inline-block mb-3">
                <i class="bi bi-gem display-4 text-primary"></i>
              </router-link>
              <h2 class="h3 fw-bold mb-1">Inscription</h2>
              <p class="text-muted mb-0">
                Rejoignez la communauté Collector.shop
              </p>
            </div>

            <form @submit.prevent="handleRegister" novalidate>
              <!-- Name -->
              <div class="mb-4">
                <label for="name" class="form-label fw-semibold">Nom complet</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-person"></i>
                  </span>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="mb-4">
                <label for="email" class="form-label fw-semibold">Email</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="mb-4">
                <label for="password" class="form-label fw-semibold">Mot de passe</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="mb-4">
                <label for="confirmPassword" class="form-label fw-semibold">
                  Confirmer mot de passe
                </label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    type="password"
                    class="form-control"
                    placeholder="••••••••"
                    :class="{ 'is-invalid': userStore.error }"
                    required
                  />
                </div>
                <div v-if="userStore.error" class="invalid-feedback d-block">
                  {{ userStore.error }}
                </div>
              </div>

              <!-- Buttons -->
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="userStore.loading"
                >
                  <span v-if="userStore.loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ userStore.loading ? 'Inscription...' : 'S\'inscrire' }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="router.push('/login')"
                >
                  J'ai déjà un compte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
