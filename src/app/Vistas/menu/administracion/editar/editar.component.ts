import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/Servicios/autenticacion.service';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { Usuario } from 'src/app/modelo/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  // Variable id donde guardaremos el id del usuario
  id: string = "";
   
   usuario: Usuario = {
     nombre: '', id_acceso: 1, email: '', pass: '', telefono: '',
     apellido: ''
   };
   formEditar = this.formBuilder.group({
     nombre: ['',[ Validators.required, Validators.minLength(3)]],
     apellidos: ['', [Validators.required, Validators.maxLength(15)]],
     emailform: ['', [Validators.required, Validators.email]],
     telefono: ['', [Validators.required,Validators.maxLength(9)]],
     pass: ['', [Validators.required]],
     acceso: [this.usuario.id_acceso, Validators.required]
     });

    constructor(private formBuilder: FormBuilder, 
      private route: ActivatedRoute, // Servicio de angular que contiene información sobre la ruta actual
      private fondoService: CambioFondoService, 
      private renderer: Renderer2, private el: ElementRef, 
      public authService: AutenticacionService,
      private fbs:FirebaseService) {
      }
  
    ngOnInit(): void {
        this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/Camiones.png');

        // Comprobamos si hay id en la url
      if (this.route.snapshot.paramMap.get('id') != null) {
        // Guardamos el id en la variable id
        this.id = this.route.snapshot.paramMap.get('id')!;

        // Obtenemos el usuario por el id
        this.fbs.getFireBasePorId('Usuario',this.id).subscribe(res => {
          // Guardamos el usuario en el objeto usuario
          this.usuario = res;

          this.formEditar.patchValue({
            nombre: this.usuario.nombre,
            telefono: this.usuario.telefono,
            apellidos:this.usuario.apellido,
            emailform: this.usuario.email,
            pass: this.usuario.pass,
            acceso: this.usuario.id_acceso
          })
        });
      }
    }

    editaUsuario() {
      // Actualizamos los datos del usuario con el formulario
      this.usuario.email = this.formEditar.value.emailform!;
      this.usuario.apellido = this.formEditar.value.apellidos!;
      this.usuario.id_acceso = 1;
      this.usuario.nombre = this.formEditar.value.nombre!;
      this.usuario.pass = this.formEditar.value.pass!;
      this.usuario.telefono = this.formEditar.value.telefono!;
      this.usuario.id_acceso = this.formEditar.value.acceso!;

      // Actualizamos el usuario en la base de datos
      this.fbs.updateFireBase(this.usuario, 'Usuario',this.id)
        .then(() => Swal.fire({
          title: "Editado!",
          text: "Usuario ha sido editado",
          icon: 'success'
        }))
        .catch(() => Swal.fire({
          title: "Oops...!",
          text: "El usuario no ha sido editado",
         icon: 'error'
        }));

    }
}
