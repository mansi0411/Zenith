// Import unique product images
import whiteTshirt from '@/assets/products/white-tshirt.jpg';
import blackHoodie from '@/assets/products/black-hoodie.jpg';
import blueJeans from '@/assets/products/blue-jeans.jpg';
import floralMaxiDress from '@/assets/products/floral-maxi-dress.jpg';
import pinkCropTop from '@/assets/products/pink-crop-top.jpg';
import blackLeatherJacket from '@/assets/products/black-leather-jacket.jpg';
import greySweatshirt from '@/assets/products/grey-sweatshirt.jpg';
import khakiCargoPants from '@/assets/products/khaki-cargo-pants.jpg';
import redPartyDress from '@/assets/products/red-party-dress.jpg';
import navyBlueBlazer from '@/assets/products/navy-blue-blazer.jpg';

export type Category = 'women' | 'men' | 'accessories';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  brand?: string;
  isNew?: boolean;
  isOnSale?: boolean;
  rating?: number;
  colors?: string[];
  sizes?: string[];
  stock?: number;
}

export const products: Product[] = [
  // Exactly 10 products with unique images
  {
    id: 'p1',
    name: 'Classic White T-Shirt',
    description: 'Premium cotton crew neck tee',
    price: 799,
    image: whiteTshirt,
    category: 'men',
    brand: 'Zenith',
    isNew: true,
    rating: 4.5,
    colors: ['#ffffff', '#f3f4f6'],
    sizes: ['S','M','L','XL','XXL'],
    stock: 50,
  },
  {
    id: 'p2',
    name: 'Black Hoodie',
    description: 'Comfortable cotton blend hoodie',
    price: 1999,
    image: blackHoodie,
    category: 'men',
    brand: 'Zenith',
    rating: 4.7,
    colors: ['#000000', '#111827'],
    sizes: ['S','M','L','XL'],
    stock: 30,
  },
  {
    id: 'p3',
    name: 'Blue Denim Jeans',
    description: 'Slim fit stretch denim jeans',
    price: 2499,
    image: blueJeans,
    category: 'men',
    brand: 'Zenith',
    isNew: true,
    rating: 4.4,
    colors: ['#1e40af', '#1e3a8a'],
    sizes: ['30','32','34','36'],
    stock: 40,
  },
  {
    id: 'p4',
    name: 'Floral Maxi Dress',
    description: 'Elegant summer maxi dress',
    price: 2299,
    image: floralMaxiDress,
    category: 'women',
    brand: 'Zenith',
    rating: 4.8,
    colors: ['#f472b6', '#a855f7', '#3b82f6'],
    sizes: ['XS','S','M','L'],
    stock: 25,
  },
  {
    id: 'p5',
    name: 'Pink Crop Top',
    description: 'Trendy fitted crop top',
    price: 899,
    image: pinkCropTop,
    category: 'women',
    brand: 'Zenith',
    isNew: true,
    rating: 4.3,
    colors: ['#ec4899', '#f472b6'],
    sizes: ['XS','S','M','L'],
    stock: 35,
  },
  {
    id: 'p6',
    name: 'Black Leather Jacket',
    description: 'Genuine leather jacket with zippers',
    price: 5999,
    image: blackLeatherJacket,
    category: 'accessories',
    brand: 'Zenith Luxe',
    rating: 4.9,
    colors: ['#000000'],
    sizes: ['S','M','L','XL'],
    stock: 15,
  },
  {
    id: 'p7',
    name: 'Grey Sweatshirt',
    description: 'Cozy oversized sweatshirt',
    price: 1599,
    image: greySweatshirt,
    category: 'women',
    brand: 'Zenith',
    rating: 4.6,
    colors: ['#6b7280', '#9ca3af'],
    sizes: ['S','M','L','XL'],
    stock: 28,
  },
  {
    id: 'p8',
    name: 'Khaki Cargo Pants',
    description: 'Multi-pocket utility pants',
    price: 1899,
    image: khakiCargoPants,
    category: 'men',
    brand: 'Zenith',
    rating: 4.2,
    colors: ['#a3a3a3', '#d6d3d1'],
    sizes: ['30','32','34','36'],
    stock: 45,
  },
  {
    id: 'p9',
    name: 'Red Party Dress',
    description: 'Elegant evening party dress',
    price: 2799,
    image: redPartyDress,
    category: 'women',
    brand: 'Zenith',
    isNew: true,
    rating: 4.7,
    colors: ['#dc2626', '#ef4444'],
    sizes: ['XS','S','M','L'],
    stock: 20,
  },
  {
    id: 'p10',
    name: 'Navy Blue Blazer',
    description: 'Professional tailored blazer',
    price: 3999,
    image: navyBlueBlazer,
    category: 'men',
    brand: 'Zenith',
    rating: 4.8,
    colors: ['#1e3a8a', '#1e40af'],
    sizes: ['S','M','L','XL'],
    stock: 22,
  }
];

export function getProductById(id: string) {
  return products.find(p => p.id === id);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [] as Product[];
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.brand?.toLowerCase().includes(q) ?? false) ||
    p.category.toLowerCase().includes(q),
  );
}
