import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { LocationComponent } from './location/location.component';
import { LayoutComponent } from './layout/layout.component';
import { BookedComponent } from './booked/booked.component';
import { TableComponent } from './table/table.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { ProfileComponent } from './profile/profile.component';
import { ParkzonesComponent } from './parkzones/parkzones.component';
import { AddparkzonesComponent } from './addparkzones/addparkzones.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ListparkzonesComponent } from './listparkzones/listparkzones.component';
import { UpdateparkzonesComponent } from './updateparkzones/updateparkzones.component';
import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { MyparkzoneComponent } from './myparkzone/myparkzone.component';
import { ReservationComponent } from './reservation/reservation.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:"login",component:LoginComponent
  },
   {
    path:"adminlogin",component:AdminloginComponent
  },
  {
    path:"adminregister",component:AdminregisterComponent
  },
  {
    path:"register",component:RegisterComponent
  },
  {
    path:"location",component:LocationComponent
  },
  {
    path:"layout",component:LayoutComponent
  },
  {
    path:"booked",component:BookedComponent
  },
  {
    path:"table",component:TableComponent
  },
  {
    path:"*", component:PagenotfoundComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  {
    path:'addparkzone',component:AddparkzonesComponent
  },
  {
    path:'parkzone',component:ParkzonesComponent
  },
  {
    path:'changeps',component:ChangepasswordComponent
  },
  {
    path:'listparkzone',component:ListparkzonesComponent
  },
  {
    path:'updateparkzone',component:UpdateparkzonesComponent
  },
  {
    path:'viewbooking',component:ViewbookingsComponent
  },
  {
    path:'parkzone/:pk',component:MyparkzoneComponent
  },
  {
    path:'reservation/:pk',component:ReservationComponent
  },
  {
    path:'history',component:HistoryComponent
  }

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
