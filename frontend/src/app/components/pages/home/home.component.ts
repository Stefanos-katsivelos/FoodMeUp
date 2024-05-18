import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeartComponent } from '../../partials/heart/heart.component';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { faClock } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
    HeartComponent,
    StarRatingComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  faClock = faClock;

  foods: Food[] = [];
  constructor(private foodService: FoodService) {
    this.foods = foodService.getAll();
  }
}
