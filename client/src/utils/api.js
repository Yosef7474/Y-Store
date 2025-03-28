// utils/api.js
import axios from 'axios';
import { setupCache, buildStorage } from 'axios-cache-interceptor';

// Create a custom storage that uses localStorage
const localStorageCache = buildStorage({
  find: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => {
    localStorage.removeItem(key);
  }
});

// Create cached axios instance
const api = setupCache(axios, {
  ttl: 15 * 60 * 1000, // 15 minutes cache
  methods: ['get'], // Only cache GET requests
  storage: localStorageCache, // Use our custom storage
  cachePredicate: {
    statusCheck: (status) => status >= 200 && status < 400,
    responseMatch: (response) => {
      // Don't cache if response explicitly says not to
      return response.data?.shouldCache !== false;
    }
  }
});

export default api;