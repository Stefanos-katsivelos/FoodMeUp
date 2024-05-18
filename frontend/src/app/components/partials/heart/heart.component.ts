import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-heart',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './heart.component.html',
  styleUrl: './heart.component.css',
})
export class HeartComponent {
  faHeart = faHeart;

  isFavorite = false;
  ngClass: any;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
