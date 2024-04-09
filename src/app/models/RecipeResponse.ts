import { User } from './User';

export interface RecipeResponse {
  id?: number;
  title: string;
  user: User;
  image: string;
  description: string;
  vegetarian: boolean;
  likes: number[];
}
