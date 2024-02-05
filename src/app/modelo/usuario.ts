export interface Usuario {
    id?:string;
    nombre:string;
    apellido:string;
    id_acceso:number;
    telefono:string;
    email:string;
    pass:string;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }
