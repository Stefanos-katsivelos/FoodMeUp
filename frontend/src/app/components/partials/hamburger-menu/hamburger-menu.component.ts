import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule, RouterLink],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.css'
})
export class HamburgerMenuComponent {
  @Input() cartQuantity!: number;
  @Input() isMenuOpen = false;
  @Input() user!: User
  faShoppingCart = faShoppingCart;

  constructor(private userService: UserService) {


  }

  logout() {
    this.userService.logout();
  }
  
}
