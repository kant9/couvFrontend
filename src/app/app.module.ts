import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { InfosCouvComponent } from './pages/infos-couv/infos-couv.component';
import { ModifPasswordComponent } from './pages/modif-password/modif-password.component';
import { ReglageComponent } from './pages/reglage/reglage.component';
import { SideBarGComponent } from './pages/side-bar-g/side-bar-g.component';
import { SideBarDComponent } from './pages/side-bar-d/side-bar-d.component';
import { TableauComponent } from './pages/tableau/tableau.component';
import { TempHumComponent } from './pages/temp-hum/temp-hum.component';
import { SauvegardeComponent } from './pages/sauvegarde/sauvegarde.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    InfosCouvComponent,
    ModifPasswordComponent,
    ReglageComponent,
    SideBarGComponent,
    SideBarDComponent,
    TableauComponent,
    TempHumComponent,
    SauvegardeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
