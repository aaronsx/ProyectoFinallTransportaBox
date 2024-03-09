import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { TiendaComponent } from './tienda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarComponent } from './editar/editar.component';


@NgModule({
  declarations: [
    TiendaComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    FormsModule,
    NgbModule,
   ReactiveFormsModule,
  ]
})
export class TiendaModule { }
