<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = async () => {
  const success = await userStore.login(email.value, password.value)
  if (success) {
    router.push('/')
  }
}

// Test credentials
const testCreds = { email: 'test@collector.shop', password: 'password123' }
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
              <h2 class="h3 fw-bold mb-1">Connexion</h2>
              <p class="text-muted mb-0">Accédez à votre compte Collector.shop</p>
            </div>

            <!-- Test credentials -->
            <div class="alert alert-info border-0 mb-4">
              <small> <strong>Test :</strong> test@collector.shop / password123 </small>
            </div>

            <form @submit.prevent="handleLogin" novalidate>
              <!-- Email -->
              <div class="mb-4">
                <label for="email" class="form-label fw-semibold">Email</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    placeholder="votre@email.com"
                    :class="{ 'is-invalid': userStore.error }"
                    required
                  />
                </div>
                <div v-if="userStore.error" class="invalid-feedback d-block">
                  {{ userStore.error }}
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
                    v-model="password"
                    type="password"
                    class="form-control"
                    placeholder="••••••••"
                    :class="{ 'is-invalid': userStore.error }"
                    required
                  />
                </div>
              </div>

              <!-- Remember me -->
              <div class="mb-4 form-check">
                <input
                  id="remember"
                  v-model="rememberMe"
                  class="form-check-input"
                  type="checkbox"
                />
                <label for="remember" class="form-check-label"> Se souvenir de moi </label>
              </div>

              <!-- Buttons -->
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary btn-lg" :disabled="userStore.loading">
                  <span
                    v-if="userStore.loading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  {{ userStore.loading ? 'Connexion...' : 'Se connecter' }}
                </button>
                <button type="button" class="btn btn-outline-secondary" @click="router.push('/')">
                  Retour au catalogue
                </button>
              </div>
            </form>

            <div class="text-center mt-4">
              <p class="mb-0">
                Pas de compte ?
                <router-link to="/register" class="text-primary fw-semibold">
                  S'inscrire
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
