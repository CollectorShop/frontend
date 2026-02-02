import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  roles: string[];
}

export const useUserStore = defineStore('user', () => {
  // État
  const user: Ref<User | null> = ref(null);
  const token: Ref<string | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value);
  const isAdmin = computed(() => user.value?.roles.includes('admin') ?? false);

  // Actions
  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      // Mock API - futur backend .NET JWT
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      if (email === 'test@collector.shop' && password === 'password123') {
        user.value = {
          id: 'user1',
          email,
          name: 'Test User',
          avatar: null,
          roles: ['user']
        };
        token.value = 'mock-jwt-token-123456';
        localStorage.setItem('token', token.value);
        localStorage.setItem('user', JSON.stringify(user.value));
        return true;
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur de connexion';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    loading.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      // Mock registration success → auto-login
      user.value = {
        id: 'user-new',
        email,
        name,
        avatar: null,
        roles: ['user']
      };
      token.value = 'mock-jwt-register-789';
      localStorage.setItem('token', token.value);
      localStorage.setItem('user', JSON.stringify(user.value));
      return true;
    } catch (err) {
        console.log(err)
      error.value = 'Erreur lors de l\'inscription';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const initAuth = () => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    initAuth
  };
});
