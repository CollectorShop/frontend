import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, FilterState, Category } from '@/types/catalogue';

export const useCatalogueStore = defineStore('catalogue', () => {
  // État
  const products = ref<Product[]>([]);
  const categories = ref<Category[]>([
    { id: 'sneakers', name: 'Sneakers', slug: 'sneakers', icon: '👟' },
    { id: 'figurines', name: 'Figurines', slug: 'figurines', icon: '🦸‍♂️' },
    { id: 'vinyls', name: 'Vinyles', slug: 'vinyls', icon: '🎵' },
    { id: 'cards', name: 'Cartes', slug: 'cards', icon: '🃏' },
  ]);
  
  const filters = ref<FilterState>({
    category: null,
    minPrice: null,
    maxPrice: null,
    condition: [],
    search: ''
  });

  const loading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const error = ref<string | null>(null);

  // Getters
  const filteredProducts = computed(() => {
    let result = products.value;

    // Filtre catégorie
    if (filters.value.category) {
      result = result.filter(p => p.category.toLowerCase() === filters.value.category!.toLowerCase());
    }

    // Filtre prix
    if (filters.value.minPrice) {
      result = result.filter(p => p.price >= filters.value.minPrice!);
    }
    if (filters.value.maxPrice) {
      result = result.filter(p => p.price <= filters.value.maxPrice!);
    }

    // Filtre recherche
    if (filters.value.search) {
      const query = filters.value.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Filtre condition
    if (filters.value.condition.length > 0) {
      result = result.filter(p => filters.value.condition.includes(p.condition));
    }

    return result;
  });

  const productsByPage = computed(() => {
    const pageSize = 12;
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredProducts.value.slice(start, end);
  });

  // Actions
  const fetchProducts = async (page: number = 1) => {
    loading.value = true;
    error.value = null;
    
    try {
      // Mock API - futur backend .NET
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockProducts: Product[] = [
        {
          id: '1',
          title: "Air Jordan 1 Retro High OG 'Chicago Reimagined'",
          description: "État exceptionnel, boîte d'origine incluse.",
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
          description: "Glow in the dark, édition limitée 2023.",
          price: 45,
          category: 'Figurines',
          condition: 'new',
          images: ['/api/placeholder/300/200'],
          sellerId: 'user2',
          createdAt: '2026-01-07T14:20:00Z'
        },
        // +8 autres produits mock...
      ];

      products.value = mockProducts;
      totalPages.value = 5;
      currentPage.value = page;
    } catch (err) {
      console.log(err)
      error.value = 'Erreur lors du chargement du catalogue';
    } finally {
      loading.value = false;
    }
  };

  const setFilters = (newFilters: Partial<FilterState>) => {
    Object.assign(filters.value, newFilters);
    currentPage.value = 1; // Reset pagination
  };

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const clearFilters = () => {
    filters.value = {
      category: null,
      minPrice: null,
      maxPrice: null,
      condition: [],
      search: ''
    };
    currentPage.value = 1;
  };

  // Initialisation
  const $reset = () => {
    products.value = [];
    filters.value = { category: null, minPrice: null, maxPrice: null, condition: [], search: '' };
    currentPage.value = 1;
    loading.value = false;
    error.value = null;
  };

  return {
    // State
    products,
    categories,
    filters,
    loading,
    currentPage,
    totalPages,
    error,
    
    // Getters
    filteredProducts,
    productsByPage,
    
    // Actions
    fetchProducts,
    setFilters,
    setPage,
    clearFilters,
    $reset
  };
});
