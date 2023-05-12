import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import { TableauComponent } from './components/tableau/tableau.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReglageComponent } from './pages/reglage/reglage.component';
import { JtwInterceptor } from './helpers/interceptor.service';
import { InfosSerreComponent } from './pages/infos-serre/infos-serre.component';
import { TableauComponent } from './pages/tableau/tableau.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TempHumComponent } from './pages/temp-hum/temp-hum.component';
import { ModifPasswordComponent } from './pages/modif-password/modif-password.component';
import { GooleMapsComponent } from './pages/goole-maps/goole-maps.component';
import { SocketioService } from './services/socketio.service';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DashbComponent } from './pages/dashb/dashb.component';

import {ChartModule} from 'angular-highcharts'

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    SideBarComponent,
    LoginComponent,
    ReglageComponent,
    InfosSerreComponent,
    TableauComponent,
    TempHumComponent,
    ModifPasswordComponent,
    GooleMapsComponent,
    ConnexionComponent,
    DashbComponent
    // NavBarComponent,
    // SideBarComponent,
    // LoginComponent,
    // DashbordComponent,
    // TableauComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    ChartModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    }),
    HttpClientModule,
    NgbDatepickerModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,useClass: JtwInterceptor, multi: true},SocketioService, 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
