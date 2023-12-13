import { Author } from './author.types';
import { Category } from './category.types';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  author: Author[];
  img: string;
  creationAt: string;
}
