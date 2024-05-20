import { Component, Input } from '@angular/core';
import { EFood} from '../../../shared/models/interfaces/food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
})
export class FoodPageComponent {

  food: EFood = {
    id: '',
    name: '',
    price: 0,
    tags: [],
    favorite: false,
    stars: 0,
    imageUrl: '',
    origins: [],
    cookTime: ''
  };
  faHeart = faHeart;
  

  constructor (activatedRoute: ActivatedRoute, foodService: FoodService) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
        this.food = foodService.getFoodById(params.id);
    })
  }
}
