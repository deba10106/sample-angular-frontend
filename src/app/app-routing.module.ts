import { DeliveryComponent } from './components/delivery/delivery.component';
import { SellComponent } from './components/sell/sell.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeggiesComponent } from './components/veggies/veggies.component';
import { FishMeatComponent } from './components/fish-meat/fish-meat.component';
import { GroceriesComponent } from './components/groceries/groceries.component';
import { ShopComponent } from './components/shop/shop.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddressComponent } from './components/address/address.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdminComponent } from "./admin/admin.component";
import {AppComponent} from "./app.component";


const routes: Routes = [
  { path: 'admin', component: AdminComponent},
  //{ path: 'veggies', component: VeggiesComponent},
  { path: 'cart', component: CartComponent},
  //{ path: 'profile', component: ProfileComponent},
  { path: 'fish-meat', component: FishMeatComponent},
  { path: 'groceries', component: GroceriesComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'sell', component: SellComponent},
  { path: 'delivery', component: DeliveryComponent},
  { path: 'medicines', component: MedicinesComponent},

  { path: 'orders', component: OrdersComponent},
  { path: 'address', component: AddressComponent},
  { path: 'notifications', component: NotificationsComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
