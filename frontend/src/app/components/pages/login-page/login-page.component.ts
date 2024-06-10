import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebookF, faGithub, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TitleComponent, CommonModule, FontAwesomeModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isSignDivVisiable = false;
  isSubmitted = false;
  returnUrl = '';
  faGooglePlusG =faGooglePlusG;
  faFacebookF = faFacebookF;
  faGithub= faGithub;
  faLinkedinIn =faLinkedinIn;
  

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    
  ) {}

   ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      address: new FormControl('', Validators.required)
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    console.log('ngOnInit() method called');

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.loginForm.controls;
  }

  submitLogin() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.userService.login({email: this.fc.email.value,
      password: this.fc.password.value}).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }

  get fcr() {
    return this.registerForm.controls;
  }

  submitRegistration() {
    this.isSubmitted = true;
    if (this.registerForm.invalid){
      console.log('Registration form is invalid');
      return;
    } 
  
    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password, 
      address: fv.address
    };
  
    this.userService.register(user).subscribe(() => {
      console.log('Registration successful');
      this.router.navigateByUrl(this.returnUrl);
    }, (error) => {
      console.log('Error occurred during registration:', error);
    });
  }
}
