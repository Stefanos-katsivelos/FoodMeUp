import { Component, } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeartComponent } from '../../partials/heart/heart.component';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Food } from '../../../shared/models/Food';


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
    TagsComponent,
    NotFoundComponent,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  faClock = faClock;

  foods: Food[] = [];
  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute,
  ) {
    let foodsObservalbe: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservalbe = this.foodService.getAllFoodsBySearchTerm(
          params.searchTerm,
        );
      else if (params.tag)
        foodsObservalbe = this.foodService.getAllFoodsByTags(params.tag);
      else foodsObservalbe = foodService.getAll();

      foodsObservalbe.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })
  }
}
