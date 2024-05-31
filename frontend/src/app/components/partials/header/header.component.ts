import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,FontAwesomeModule,HamburgerMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {

  faShoppingCart = faShoppingCart;
  faBars = faBars;
  faUser = faUser;
  cartQuantity = 0;
  user!: User;
  isMenuOpen = false;

  constructor(cartSerice: CartService,private userService: UserService) {
    cartSerice.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }

}
