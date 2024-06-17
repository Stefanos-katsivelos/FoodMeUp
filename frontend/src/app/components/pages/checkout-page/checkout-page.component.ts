import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { TitleComponent } from "../../partials/title/title.component";
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
  imports: [ReactiveFormsModule, OrderItemsListComponent, TitleComponent]
})
export class CheckoutPageComponent {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  invalidCheckout = false;

  constructor(
    cartService: CartService,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      address: new FormControl(address, Validators.required),
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs, Invalid Inputs');
      return;
    }
  
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
  
    const token = this.userService.currentUser.token;
    console.log('Sending token:', token);  // Log the token being sent
  
    this.orderService.create(this.order).subscribe({
      next: (response) => {
        this.toastrService.success('Order created successfully!');
        this.router.navigate(['/order-confirmation', response.id]);
      },
      error: (error) => {
        this.toastrService.error('Failed to create order.');
        console.error('Error creating order:', error); // Debug logging
      }
    });
  }
}