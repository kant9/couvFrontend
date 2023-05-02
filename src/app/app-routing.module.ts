import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfosSerreComponent } from './pages/infos-serre/infos-serre.component';
import { LoginComponent } from './pages/login/login.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';

const routes: Routes = [
  // {component:LoginComponent, path:''},
  // {component:InfosSerreComponent, path:'info'},
  {component:SideBarComponent, path:'home'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
