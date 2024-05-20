import { Injectable } from '@angular/core';
import { EFood, Food, Tag, sample_foods, sample_tags } from '../shared/models/interfaces/food';


@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): EFood[] {
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
    );
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTags(tag: string): EFood[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId: string): Food {
    return this.getAll().find((food) => food.id == foodId) ?? new Food();
  }

}
