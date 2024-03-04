import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent, // Contenedor para las subrutas de 'admin'
    children: [
      {
        path: 'editar',
        component: EditarComponent,
      },
      // Otras subrutas de administración aquí
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
