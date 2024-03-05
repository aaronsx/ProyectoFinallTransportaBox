import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const loginGuard=()=>{
    const router = inject(Router);
    if(localStorage.getItem('user')!=null){
        console.log("true");
        return true;
    }else{
        console.log("false");
        router.navigate(['/login']);
        return false;
    }
}