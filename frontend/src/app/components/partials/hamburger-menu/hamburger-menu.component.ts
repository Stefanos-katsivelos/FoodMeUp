import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.css'
})
export class HamburgerMenuComponent {

  @Input() cartQuantity!: number;
  @Input() isMenuOpen = false;

  faShoppingCart = faShoppingCart;
  
}
