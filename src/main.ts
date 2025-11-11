import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './views/HomePage.vue'
import ProductDetailPage from './views/ProductDetailPage.vue'
import CollectionPage from './views/CollectionPage.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/products/:slug',
      name: 'product-detail',
      component: ProductDetailPage
    },
    {
      path: '/collections/:slug',
      name: 'collection',
      component: CollectionPage
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')