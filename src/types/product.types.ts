import { Author } from './author.types';
import { Category } from './category.types';

export interface Product {
  id: string;
  _id: string;
  title: string;
  description: string;
  category: Category[];
  author: Author[];
  img: string;
  creationAt: string;
  publisher: string;
  edition: string;
  ISBN: string;
}
