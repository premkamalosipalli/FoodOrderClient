import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../entities/Address';
import { Restaurant } from '../entities/Restaurant';
import RestaurantService from '../Services/restaurant.service';

@Component({
  selector: 'app-restaurant-update',
  templateUrl: './restaurant-update.component.html',
  styleUrls: ['./restaurant-update.component.css']
})
export class RestaurantUpdateComponent implements OnInit {

  restaurant : Restaurant;
  address : Address;
  restaurantId : number;
  message:string;
  userFile:any;
  imgURL:any;
  imagePath:any;
  submitted = false;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder,
    private restaurantService : RestaurantService
  ) { }

  addressForm: FormGroup = new FormGroup({
    street: new FormControl,
    city: new FormControl,
    state: new FormControl,
    zipCode: new FormControl,
    country: new FormControl,
  })
  restaurantForm: FormGroup = new FormGroup({
    restaurantName: new FormControl,
    imageLocation: new FormControl,
    description: new FormControl,
    phoneNumber: new FormControl
  });

  onReset(): void {
    this.submitted = false;
    this.restaurantForm.reset();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.restaurantForm.controls;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.restaurant = new Restaurant();
    this.address = new Address();

    this.restaurantId = this.route.snapshot.params['restaurantId'];

    this.restaurantService.getRestaurant(this.restaurantId).subscribe(
      data=>{
        this.address = data.address;
        this.restaurant = data;
      }
    );

    this.restaurantForm = this.formBuilder.group({
      restaurantName: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
      imageLocation: ['', Validators.required],
      description: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]],
      street: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      state: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      zipCode: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(6)
      ]],
      country: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
    })
  }

  onFileUpload(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if(mimeType.match(/image\/*/)== null){
        this.message = "ONLY imges are supported";
        return;
      }

      var reader = new FileReader();

      this.imagePath= file;
      reader.readAsDataURL(file);
      reader.onload = (_event)=>{
        this.imgURL=reader.result;
      }
    }
  }

  updateRestaurant(restaurantId:number){
    this.submitted = true;

    if (this.restaurantForm.valid) {
      const restaurant = new FormData();
      const restaurantForm = this.restaurantForm.value;
      const address: Address = {
        street:restaurantForm.street,
        city:restaurantForm.city,
        state:restaurantForm.state,
        country:restaurantForm.country,
        zipCode:restaurantForm.zipCode
      }
      const restaurantDetails:Restaurant = {
        restaurantId:restaurantId,
        restaurantName:restaurantForm.restaurantName,
        imageLocation:restaurantForm.imageLocation,
        description:restaurantForm.description,
        address:address,
        phoneNumber:restaurantForm.phoneNumber

      }

      const restaurantObject = JSON.stringify(restaurantDetails);
      restaurant.append('restaurant',restaurantObject);
      restaurant.append('imageLocation',this.userFile);
      this.restaurantService.updateRestaurant(restaurantId,restaurant).subscribe(
        data=>{
          alert(this.message="Restaurant Updated Successfully");
          this.router.navigate(['/listRestaurants']);
        } 
      );
    }
  }

}
