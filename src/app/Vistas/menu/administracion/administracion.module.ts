import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarComponent } from './editar/editar.component';


@NgModule({
  declarations: [
    AdministracionComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule, 
     FormsModule,
     NgbModule,
    ReactiveFormsModule,
  ]
})
export class AdministracionModule { }
