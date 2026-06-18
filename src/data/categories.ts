import type { ProductCategory } from '../types';
import { products as phones } from '../data';
import { laptops } from './laptops';

export const categories: ProductCategory[] = [
  { id: 'phones', name: 'Smartphones', icon: 'Smartphone', products: phones },
  { id: 'laptops', name: 'Laptops', icon: 'Smartphone', products: laptops },
];
