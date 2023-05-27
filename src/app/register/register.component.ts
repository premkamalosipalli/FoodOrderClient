import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../Services/login-register.service';
import { user } from '../entities/user';
import Validation from "../entities/Validation";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted=false;
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl,
      lastName: new FormControl,
      userName: new FormControl,
      role:new FormControl,
      emailId:new FormControl,
      phoneNumber:new FormControl,
      password:new FormControl
  });
  user:user = new user();
  
  constructor(
      private formBuilder: FormBuilder,
        private router: Router,
        private loginService:LoginRegisterService
  ) { }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName:['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      role:['',Validators.required],
      emailId:['',[Validators.required, Validators.email]],
      phoneNumber:['',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      password:['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40)
      ]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  },
  {
    validators: [Validation.match('password', 'confirmPassword')]
  }
  );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  registerUser(){
    this.submitted = true;
    if (this.registerForm.valid) {
    this.loginService.saveUser(this.registerForm.value).subscribe(
      data => {
        if(data!=null){
          this.router.navigateByUrl('/login');
        }else{
          alert("userName already exist")
        }
      }
    );
  }else{
    return;
  }
}

onReset(): void {
  this.submitted = false;
  this.registerForm.reset();
}

}
