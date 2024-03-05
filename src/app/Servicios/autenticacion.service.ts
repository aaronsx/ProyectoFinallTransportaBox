import { Injectable, NgZone } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/Servicios/firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  userData: any; // Guardar los datos del usuario registrado
  constructor(
    public afs: AngularFirestore, // Inyectar servicio Firestore
    public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
    public router: Router,
    public ngZone: NgZone, // Servicio NgZone para eliminar la advertencia fuera del alcance
    private fbs:FirebaseService
  ) {
    /* Guardar datos de usuario en el almacenamiento local cuando
    iniciado sesión y configurando nulo cuando se cierra la sesión */
    console.log("Constructor del ofAuth:"+this.afAuth.authState);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } 
    });
  }
  // Login con email y contraseña
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
       //Enviardatos
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['menu']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
    // Registrarse con email y contraseña
  SignUp(usuario:any) {
    console.log(usuario.email+" sin this");
    return this.afAuth
      .createUserWithEmailAndPassword(usuario.email, usuario.pass)
      .then((result) => {
        this.fbs.setFireBase(usuario,'Usuario')
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  
  
  // Devuelve verdadero cuando el usuario inicia sesión y se verifica el correo electrónico
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  
  
  // Cerrar sesión
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

 
}
