import { Component, Input, OnInit,  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  stars = [1, 2, 3, 4, 5,];
  

  setRating(rating: number) {
    this.rating = rating;
  }

  resetRating() {
    this.rating = 0;
  }

  isFullStar(i: number): boolean {
    return i + 1 <= this.rating
  }

  isHalfStar(i: number): boolean {
    const currentStar = i + 1;
    return this.rating >= currentStar - 0.5 && this.rating < currentStar;
  }
}
