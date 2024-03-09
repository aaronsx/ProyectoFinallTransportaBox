import { inject } from "@angular/core";
import { Router } from "@angular/router";
//Metodo para saber si el usuario inicio sesion de verdad
export const loginGuard=()=>{
    const router = inject(Router);
    if(localStorage.getItem('user')!=null){
        return true;
    }else{
        router.navigate(['/login']);
        return false;
    }
}