import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { Tienda } from 'src/app/modelo/tienda';
import { Usuario } from 'src/app/modelo/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent {

  // Lista donde guardaremos los usuarios
  usuarios: Usuario[] = [];
 // Lista donde guardaremos las tiendas
 tiendas: Tienda[] = [];
  constructor( 
    private fondoService: CambioFondoService, 
    private renderer: Renderer2, private el: ElementRef,
    private fbs:FirebaseService) {}

  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/Camiones.png');

    // Obtenemos todos los usuarios de la base de datos
    this.fbs.getFireBase("Usuario").subscribe(res => {
      // Guardamos los usuarios en la lista usuarios
      this.usuarios = res;

    });
  }
  //Eliminamos usuarios
  eliminarUsuario(usuario: Usuario) {
    // Comprobamos si el usuario es un Administrador
    if (usuario.id_acceso == 2) {
      Swal.fire({
        title: "Error",
        text: "No se puede borrar un Administrador",
        icon: "error"
      });
    } else {
      this.fbs.getFireBasePorCampo("Tienda","id_usuario",usuario.id).subscribe(res => {
        // Guardamos los usuarios en la lista tiendas
        
        this.tiendas = res;
        if(this.tiendas.length < 1)
        {
          // Borramos el usuario de la base de datos
            this.fbs.deleteFireBase(usuario, 'Usuario')
          .then(() => Swal.fire({
            title: "Borrado",
            text: "Borrado con éxito!!",
            icon: "success"
          }))
          .catch(() => Swal.fire({
            title: "Oops..",
            text: "Se ha producido un error. Vuelva a intentarlo más tarde.",
            icon: "error"
          }));
        }else{
          Swal.fire({
            title: "Error",
            text: "No se puede borrar tiene tienda",
            icon: "error"
          });
          
        }
      });
      
     
    }
  }
}
