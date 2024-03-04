import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/Servicios/autenticacion.service';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';
import { Usuario } from 'src/app/modelo/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  formregister = this.formBuilder.group({
    nombre: ['',[ Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.maxLength(15)]],
    emailform: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required,Validators.maxLength(9)]],
    pass: ['', [Validators.required]] });

    constructor(private formBuilder: FormBuilder, 
      private fondoService: CambioFondoService, 
      private renderer: Renderer2, private el: ElementRef, 
      public authService: AutenticacionService) {
      }
  
    ngOnInit(): void {
      this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/Camiones.png');
    }
}
