import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda.component';
import { EditarComponent } from './editar/editar.component';
import { loginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [
  { path: '', component: TiendaComponent },
  {path: 'crear',component: EditarComponent,canActivate: [loginGuard]}
      


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
