import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [{ path: '', component: MenuComponent, children:[
  { path: 'admin', loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule) },
  { path: 'tienda', loadChildren: () => import('./tienda/tienda.module').then(m => m.TiendaModule) },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
  { path: 'pedido', loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule) },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
