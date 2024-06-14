import { Component, EventEmitter, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { TitleComponent } from "../../partials/title/title.component";
import { MapComponent } from '../../partials/map/map.component';



@Component({
    selector: 'app-checkout-page',
    standalone: true,
    templateUrl: './checkout-page.component.html',
    styleUrl: './checkout-page.component.css',
    imports: [ReactiveFormsModule, OrderItemsListComponent, TitleComponent, MapComponent]
})
export class CheckoutPageComponent {
  order: Order = new Order()
  checkoutForm!: FormGroup;
  invalidCheckout = false;

  
  constructor(cartService: CartService,
    private userService:UserService,
    private toastrService: ToastrService) {
      const cart = cartService.getCart();
      this.order.items = cart.items;
      this.order.totalPrice = cart.totalPrice;
    }

    ngOnInit(): void {
      let {name, address} = this.userService.currentUser
      this.checkoutForm = new FormGroup({
        name: new FormControl(name,Validators.required),
        address: new FormControl(address,Validators.required),
      })
    
    }
    get fc() {
      return this.checkoutForm.controls
    }

    createOrder() {
      if (this.checkoutForm.invalid) {
        this.toastrService.warning('Please fill the inputs, Invalid Inputs' );
        return;
      }

      this.order.name = this.fc.name.value;
      this.order.address = this.fc.address.value;

      console.log(this.order)
    }
}