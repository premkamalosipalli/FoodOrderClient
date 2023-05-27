import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { HomeComponent } from './home/home.component';
import { ListRestaurantsComponent } from './list-restaurants/list-restaurants.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantItemsComponent } from './restaurant-items/restaurant-items.component';
import { RestaurantUpdateComponent } from './restaurant-update/restaurant-update.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SelectRestaurantComponent } from './select-restaurant/select-restaurant.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserComponent } from './user/user.component';
import { AddRestaurantItemComponent } from './add-restaurant-item/add-restaurant-item.component';
import { ListRestaurantItemsComponent } from './list-restaurant-items/list-restaurant-items.component';
import { RestaurantItemUpdateComponent } from './restaurant-item-update/restaurant-item-update.component';
import { RestaurantItemDetailsComponent } from './restaurant-item-details/restaurant-item-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login',component: LoginComponent},
  {path:'about',component: AboutComponent},
  {path:'contact',component: ContactComponent},
  {path:'register',component:RegisterComponent},
  {path:'selectRestaurant',component:SelectRestaurantComponent},
  {path:"home",component:HomeComponent},
  {path:'admin',component:AdminComponent},
  {path:'delivery',component:DeliveryComponent},
  {path:'user',component:UserComponent},
  {path:'restaurants',component:RestaurantsComponent},
  {path:'listRestaurants',component:ListRestaurantsComponent},
  {path:'updateRestaurant/:restaurantId',component:RestaurantUpdateComponent},
  {path:'restaurantDetails/:restaurantId',component:RestaurantDetailsComponent},
  {path:'restaurantItems',component:RestaurantItemsComponent},
  {path:'addRestaurantItem/:restaurantId',component:AddRestaurantItemComponent},
  {path:'listRestaurantsItems/:restaurantId',component:ListRestaurantItemsComponent},
  {path:'updateRestaurantItem/:restaurantItemId',component:RestaurantItemUpdateComponent},
  {path:'restaurantItemDetails/:restaurantItemId',component:RestaurantItemDetailsComponent},
  {path:'userDetails/:userId',component:UserDetailsComponent},
  {path:'deliveryDetails/:userId',component:DeliveryDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
