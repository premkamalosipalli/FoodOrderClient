import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../Services/local.service';
import { LoginRegisterService } from '../Services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginRegisterService,
        private localService: LocalService
  ) { }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        userName:['',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]],
        password:['',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]]
  });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onLogin(){
    this.submitted = true;
    if (this.loginForm.valid) {
    this.loginService.validateUser(this.loginForm.value).subscribe(
      data => {
        if(data!=null){
          if(data=="admin"){
            this.localService.saveData("userName",this.loginForm.value.userName)
            this.router.navigateByUrl('/admin');
          }else if(data=="user"){
            this.router.navigateByUrl('/selectRestaurant');
          }else if(data=="deliver"){
            this.router.navigateByUrl('/delivery');
          }
        }else if(data == "passwordIsIncorrect"){
          alert("Password Incorrect!");
        }else if(data=="userNotExists"){
          alert("User Not Found! please register");
        }
      });
  }else{
    return;
  }
}

}
