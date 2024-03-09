import { Injectable, NgZone } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { Usuario } from '../modelo/usuario';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  userData: any; // Guardar los datos del usuario registrado
  
    // Lista de todos los usuarios de la base de datos
    listaUsuarios?: Usuario[];

  constructor(
    public afs: AngularFirestore, // Inyectar servicio Firestore
    public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
    public router: Router,
    public ngZone: NgZone, // Servicio NgZone para eliminar la advertencia fuera del alcance
    private fbs:FirebaseService
  ) {
     // Obtenemos una lista con todos los Usuario de la base de datos
     fbs.getFireBase('Usuario').subscribe(res => this.listaUsuarios = res);
   
  }
  // Login con email y contraseña
  SignIn(email: string, password: string) {

    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
       // Buscamos el usuario en la lista de usuarios
       const usuario = this.listaUsuarios?.find(usuario => usuario.email == email);
       if (usuario?.id_acceso == 2) {
        // Creamos un nuevo valor en localStorage para indicar que el usuario es Admin
        
        localStorage.setItem('userID', '2');
      }
      // Guardamos el id del usuario en el localStorage
      localStorage.setItem('idUsuario', usuario?.id!);

       // Almacenamos la información del usuario autentificado
       this.userData = result.user;
       localStorage.setItem('user', JSON.stringify(this.userData));
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['menu']);
          }
        });
      })
      .catch((error) => {
         Swal.fire({
          title: "Oops..",
          text: "El email y/o contraseña no son correctos!!",
          icon: "error"
        });
      });
  }

    // Registrarse con email y contraseña
  SignUp(usuario:any) {
    return this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass)
      .then((result) => {
        localStorage.removeItem('user');
        //Registramos el usuario en la base de datos
        this.fbs.setFireBase(usuario,'Usuario')
        
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops..",
          text: "El Email introducido ya existe!!",
          icon: "error"
        });
      });
  }

  /**
   * Método que devuelve true si el usuario es admin o false si no
   */
  get isAdmin(): boolean {
    const id_acceso = localStorage.getItem('userID');
    return id_acceso !== null; // Devuelve true si existe un valor en userID
  }
  
  // Devuelve verdadero cuando el usuario inicia sesión y se verifica el correo electrónico
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  
  
  // Cerrar sesión
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('userID');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

 
}
