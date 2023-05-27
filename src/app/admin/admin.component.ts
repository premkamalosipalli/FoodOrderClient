import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from '../entities/Restaurant';
import { user } from '../entities/user';
import { Address } from '../entities/Address';
import { LocalService } from '../Services/local.service';
import { LoginRegisterService } from '../Services/login-register.service';
import RestaurantService from '../Services/restaurant.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: user;
  restaurant: Restaurant;
  users: user[];
  userName: string;
  countUsers: any;
  countDelivery: any;
  countRestaurants: any;
  countRestaurantItems: any;
  selectedFile: File;
  base64Data: any;
  imgURL: any;
  message: string;
  userFile: any;
  imagePath: any;




  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  getUser() {
    this.router.navigate(['/home']);
  }

  getAllUser() {
    this.router.navigate(['/user']);
  }

  getAllDelivers() {
    this.router.navigate(['/delivery']);
  }

  viewRestaurants() {
    this.router.navigate(['/restaurants']);
  }

  viewRestaurantItems() {
    this.router.navigate(['/restaurantItems']);
  }

}
