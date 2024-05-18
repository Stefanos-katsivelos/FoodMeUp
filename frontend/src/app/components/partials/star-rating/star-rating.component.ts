import { Component, Input,  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  faStar = faStar;
  stars = [1, 2, 3, 4, 5,];
  rating = 0;

  setRating(rating: number) {
    this.rating = rating;
  }

  resetRating() {
    this.rating = 0;
  }
}
