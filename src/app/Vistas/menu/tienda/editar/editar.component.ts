import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from 'src/app/Servicios/autenticacion.service';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { Tienda } from 'src/app/modelo/tienda';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  tienda: Tienda = {tienda: '', codigoPostal: '',id_usuario:''};
  formEditar = this.formBuilder.group({
    tienda: ['',[ Validators.required, Validators.minLength(3)]],
    codigopostal: ['', [Validators.required, Validators.maxLength(15)]],
    });

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute, // Servicio de angular que contiene información sobre la ruta actual
    private fondoService: CambioFondoService, 
    private renderer: Renderer2, private el: ElementRef, 
    public authService: AutenticacionService,
    private fbs:FirebaseService) {
    }
    
  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/tienda.jpg');
}
  crearTienda(){
      // Creamos un objeto tienda con los datos
      this.tienda.tienda = this.formEditar.value.tienda!;
      this.tienda.codigoPostal = this.formEditar.value.tienda!;
      this.tienda.id_usuario=localStorage.getItem("idUsuario")!;

      // Creamo la tienda en la base de datos
      this.fbs.setFireBase(this.tienda, 'Tienda')
        .then(() => Swal.fire({
          title: "Editado!",
          text: "Tienda ha sido guardado",
          icon: 'success'
        }))
        .catch(() => Swal.fire({
          title: "Oops...!",
          text: "La tienda no ha sido creado",
         icon: 'error'
        }));

    }
  }

