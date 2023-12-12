export interface Author {
  _id: string;
  fullName: string;
}

export interface Book {
  _id: string;
  ISBN: string;
  title: string;
  edition: string;
  category: string;
  description: string;
  publisher: string;
  author: Author[];
  img?: string;
}

export interface BooksResponse {
  perPage: number;
  page: number;
  totalCount: number;
  totalPageCount: number;
  data: Book[];
}
