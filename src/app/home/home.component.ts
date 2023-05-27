import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../entities/user';
import { LocalService } from '../Services/local.service';
import { LoginRegisterService } from '../Services/login-register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: user;
  userName: string;
  countUsers: any;
  countDelivery: any;
  countRestaurants: any;
  countRestaurantItems: any;

  constructor(private router: Router,
    private loginRegisterService: LoginRegisterService,  
    private localService: LocalService,) { }

  ngOnInit(): void {
    this.userName = this.localService.getData("userName");
    this.loginRegisterService.getUser(this.userName).subscribe(
      data => {
        this.user = data;
      }
    );

    this.loginRegisterService.countByRole("user").subscribe(
      data => {
        this.countUsers = data;
      }
    );

    this.loginRegisterService.countByRole("deliver").subscribe(
      data => {
        this.countDelivery = data;
      }
    );

    this.loginRegisterService.countByRestaurant().subscribe(
      data => {
        this.countRestaurants = data;
      }
    );

    this.loginRegisterService.countByRestaurantItems().subscribe(
      data => {
        this.countRestaurantItems = data;
      }
    );
  }

}
