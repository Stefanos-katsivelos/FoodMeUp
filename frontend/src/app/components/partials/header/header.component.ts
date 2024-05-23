import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,FontAwesomeModule,HamburgerMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  faShoppingCart = faShoppingCart;
  faBars = faBars;
  faUser = faUser;
  cartQuantity = 0;
  isMenuOpen = false;

  constructor(cartSerice: CartService) {
    cartSerice.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount
    })
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
}
