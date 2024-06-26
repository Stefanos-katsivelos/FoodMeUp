import { Component } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { Food } from '../../../shared/models/Food';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [
    FontAwesomeModule,
    StarRatingComponent,
    RouterLink,
    CommonModule,
    NotFoundComponent,
    HttpClientModule
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
})
export class FoodPageComponent {
  food!: Food;
  faHeart = faHeart;
  origins: any;

  constructor(
    activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router,
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
      foodService.getFoodById(params.id).subscribe(serverFood => {
    this.food = serverFood});
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
