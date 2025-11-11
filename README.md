# 🛍️ Vue E-Commerce Showcase

![App Preview](https://imgix.cosmicjs.com/e2d704f0-bed1-11f0-9757-a1b2350abfc3-photo-1441986300917-64674bd600d8-1762846910513.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce storefront built with Vue 3 and powered by Cosmic CMS. This application showcases products with beautiful imagery, organized collections, and authentic customer reviews.

## ✨ Features

- 🛍️ **Product Catalog** - Browse all products with detailed information and high-quality images
- 🏷️ **Collection Filtering** - View products organized by curated collections
- 📱 **Responsive Design** - Seamless experience across all devices
- ⭐ **Customer Reviews** - Display authentic reviews with star ratings
- 💰 **Sale Pricing** - Automatic discount calculations and sale badges
- 🖼️ **Image Optimization** - All images optimized with imgix for fast loading
- 🎨 **Modern UI** - Clean, contemporary design with smooth animations

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6912e856fb7423bbdde5116b&clone_repository=6912ea37fb7423bbdde511a8)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Develop a Vue.js application that uses my existing object types and objects"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Vue Router** - Official router for Vue.js applications
- **Cosmic SDK** - Headless CMS for content management
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript development

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Cosmic bucket with Products, Collections, and Reviews object types

## 🚀 Getting Started

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory:

```env
VITE_COSMIC_BUCKET_SLUG=your-bucket-slug
VITE_COSMIC_READ_KEY=your-read-key
```

4. Start the development server:

```bash
bun run dev
```

5. Open your browser to `http://localhost:5173`

## 📚 Cosmic SDK Examples

### Fetching Products with Collections

```typescript
import { cosmic } from './lib/cosmic'

// Fetch all products with nested collection data
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Products now include full collection objects in metadata.collections
```

### Fetching Product Reviews

```typescript
// Get reviews for a specific product by product ID
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)

// Reviews include connected product data
```

### Filtering by Collection

```typescript
// Get products in a specific collection
const { objects: products } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.collections': collectionId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application integrates with three Cosmic object types:

### Products
- Product Name, Description, Price, Sale Price
- Product Images (multiple images with imgix optimization)
- In Stock status, SKU
- Connected to Collections (object metafield)

### Collections
- Collection Name, Description
- Featured Image
- Used to organize and filter products

### Reviews
- Connected to Products (object metafield)
- Reviewer Name, Rating (1-5 stars)
- Review Text, Verified Purchase status

All content is managed through your Cosmic dashboard, making it easy to add new products, update pricing, manage collections, and moderate reviews without touching code.

## 🚀 Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_COSMIC_BUCKET_SLUG`
   - `VITE_COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard
6. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:
- `VITE_COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `VITE_COSMIC_READ_KEY` - Your Cosmic read key

## 📖 Project Structure

```
├── src/
│   ├── components/       # Reusable Vue components
│   ├── views/           # Page components
│   ├── router/          # Vue Router configuration
│   ├── lib/             # Cosmic SDK and utilities
│   ├── types.ts         # TypeScript type definitions
│   └── App.vue          # Root component
├── public/              # Static assets
└── index.html          # HTML entry point
```

## 🎯 Key Features Explained

### Image Optimization
All product images are optimized using imgix parameters:
- `?w=800&h=600&fit=crop&auto=format,compress` - For product cards
- `?w=1200&h=800&fit=crop&auto=format,compress` - For detail pages
- Automatic format selection and compression

### Sale Price Logic
Products display sale pricing when `sale_price` is set:
- Original price shown with strikethrough
- Sale price prominently displayed
- Discount percentage calculated automatically

### Star Rating Display
Reviews show visual star ratings:
- Uses the rating key value (1-5)
- Displays filled/unfilled stars dynamically
- Shows verified purchase badge

<!-- README_END -->