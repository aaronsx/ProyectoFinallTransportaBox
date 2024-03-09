import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda.component';
import { EditarComponent } from './editar/editar.component';
import { loginGuard } from 'src/app/guards/login.guard';
import { DetallesComponent } from './detalles/detalles.component';

const routes: Routes = [
  { path: '', component: TiendaComponent,canActivate: [loginGuard], children: [
    {path: 'detalle',component: DetallesComponent} 
  ]},
  
  {path: 'crear',component: EditarComponent,canActivate: [loginGuard]}
      


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
