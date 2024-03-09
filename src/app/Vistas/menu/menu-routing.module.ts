import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { loginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent, // Este actúa como el layout para tus rutas anidadas
    canActivate: [loginGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule),
      },
      {
        path: 'tienda',
        loadChildren: () => import('./tienda/tienda.module').then(m => m.TiendaModule),
      }
      // Más rutas cargadas de manera perezosa aquí
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
