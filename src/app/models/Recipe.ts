export interface Recipe {
  id?: number;
  title: string;
  userId: number;
  image: string;
  description: string;
  vegetarian: boolean;
  likes: number[];
}
