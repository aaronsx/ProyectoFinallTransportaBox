import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { EditarComponent } from './editar/editar.component';
import { adminguard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent, canActivate: [adminguard], // Contenedor para las subrutas de 'admin'
  },{
    path: 'editar/:id',
        component: EditarComponent,canActivate: [adminguard],
        
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
