import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../entities/user';
import { LoginRegisterService } from '../Services/login-register.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit {

  userId: number;
  delivery: user;

  constructor(
    private loginService: LoginRegisterService,
    private route : ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.delivery = new user();

    this.userId = this.route.snapshot.params['userId'];

    this.loginService.getByUserId(this.userId).subscribe(
      data =>{
        this.delivery = data;
      }
    );
  }

  list(){
    this.router.navigate(['admin']);
  }

}
