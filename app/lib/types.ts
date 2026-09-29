export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  genre: string;
  year?: number;
  rating?: number;
}
