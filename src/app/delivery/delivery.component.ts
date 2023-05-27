import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../entities/user';
import { LoginRegisterService } from '../Services/login-register.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  users: user[];
  
  constructor(private router: Router,
    private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
    this.loginRegisterService.getAllUsersByRole("deliver").subscribe(
          data => {
            this.users = data;
          }
        );
  }

  reloadUser(){
    this.router.navigate(['/delivery']);
  }

  deleteDelivery(userId: number) {
    this.loginRegisterService.deleteUser(userId).subscribe(
      data=>{
        this.reloadUser();
      },
      error => console.log(error));
  }

  deliverDetails(userId: number) {
    this.router.navigate(['/deliveryDetails', userId]);
  }
}
