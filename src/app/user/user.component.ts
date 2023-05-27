import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../entities/user';
import { LoginRegisterService } from '../Services/login-register.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: user[];

  constructor(
    private router: Router,
    private loginRegisterService: LoginRegisterService,) { }

  ngOnInit(): void {
    this.loginRegisterService.getAllUsersByRole("deliver").subscribe(
      data => {
        this.users = data;
      }
    );
  }

  deleteUser(userId: number) {
    this.loginRegisterService.deleteUser(userId).subscribe(
      data=>{
        window.location.reload();
      },
      error => console.log(error));
  }

  userDetails(userId: number) {
    this.router.navigate(['/userDetails', userId]);
  }

}
