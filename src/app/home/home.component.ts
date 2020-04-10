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
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log(this.currentUser);
  }

  ngOnInit() {
  }

}
