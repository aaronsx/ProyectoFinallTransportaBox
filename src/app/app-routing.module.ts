import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Vistas/login/login.component';
import { RegisterComponent } from './Vistas/register/register.component';
import { loginGuard } from './guards/login.guard';
import { MenuComponent } from './Vistas/menu/menu.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu',loadChildren: () => import('./Vistas/menu/menu.module').then(m => m.MenuModule) },
  {path:"",redirectTo:"/menu",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
