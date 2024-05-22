import { Component, Input, OnInit } from '@angular/core';
import { EFood,} from '../../../shared/models/interfaces/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeartComponent } from '../../partials/heart/heart.component';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
    HeartComponent,
    StarRatingComponent,
    CommonModule,
    SearchComponent,
    TagsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  {
  faClock = faClock;

  foods: EFood[] = [];
  constructor(private foodService: FoodService, activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if(params.tag)
        this.foods = this.foodService.getAllFoodsByTags(params.tag);
      else
      this.foods = foodService.getAll();
    })
    
  }

}
