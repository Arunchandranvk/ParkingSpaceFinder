import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { LocationComponent } from './location/location.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookedComponent } from './booked/booked.component';
import { TableComponent } from './table/table.component';
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
import { CurrentdayComponent } from './currentday/currentday.component';
import { PaymentComponent } from './payment/payment.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ViewfeedbackComponent } from './viewfeedback/viewfeedback.component';
import { PayslipComponent } from './payslip/payslip.component';
import { AdminviewreserveComponent } from './adminviewreserve/adminviewreserve.component';
import { UserchangepasswordComponent } from './userchangepassword/userchangepassword.component';
import { MechanicComponent } from './mechanic/mechanic.component';
import { MechanicregisterComponent } from './mechanicregister/mechanicregister.component';
import { AddprofilemechanicComponent } from './addprofilemechanic/addprofilemechanic.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PagenotfoundComponent,
    AdminloginComponent,
    AdminregisterComponent,
    LocationComponent,
    LayoutComponent,
    BookedComponent,
    TableComponent,
    ProfileComponent,
    ParkzonesComponent,
    AddparkzonesComponent,
    ChangepasswordComponent,
    ListparkzonesComponent,
    UpdateparkzonesComponent,
    ViewbookingsComponent,
    MyparkzoneComponent,
    ReservationComponent,
    HistoryComponent,
    CurrentdayComponent,
    PaymentComponent,
    FeedbackComponent,
    ViewfeedbackComponent,
    PayslipComponent,
    AdminviewreserveComponent,
    UserchangepasswordComponent,
    MechanicComponent,
    MechanicregisterComponent,
    AddprofilemechanicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
