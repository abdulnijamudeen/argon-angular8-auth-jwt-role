import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from './../models/user';
import { AuthenticationService } from './../services/auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  }

  onLogout() {
    this.authenticationService.logout()
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      });
  }

}
