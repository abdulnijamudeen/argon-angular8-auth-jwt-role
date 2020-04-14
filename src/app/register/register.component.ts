import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './../services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from './../models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [Role.User, Validators.required]
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }

    this.authenticationService.register(
      this.registerForm.controls.username.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.role.value,
      this.registerForm.controls.name.value
      )
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {
        this.router.navigate(['/register']);
      });
  }

}
