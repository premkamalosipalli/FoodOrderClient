import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { user } from '../entities/user';
import { LoginRegisterService } from '../Services/login-register.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId: number;
  user: user;

  constructor(
    private loginService: LoginRegisterService,
    private route : ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.user = new user();

    this.userId = this.route.snapshot.params['userId'];

    this.loginService.getByUserId(this.userId).subscribe(
      data =>{
        this.user = data;
      }
    );
  }

  list(){
    this.router.navigate(['admin']);
  }

}
