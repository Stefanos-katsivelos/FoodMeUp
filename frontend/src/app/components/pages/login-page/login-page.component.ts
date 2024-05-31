import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebookF, faGithub, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TitleComponent, CommonModule, FontAwesomeModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSignDivVisiable = false;
  isSubmitted = false;
  returnUrl = '';
  faGooglePlusG =faGooglePlusG;
  faFacebookF = faFacebookF;
  faGithub= faGithub;
  faLinkedinIn =faLinkedinIn;
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.userService.login({email: this.fc.email.value,
      password: this.fc.password.value}).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
