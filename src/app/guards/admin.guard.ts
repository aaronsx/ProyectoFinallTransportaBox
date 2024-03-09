import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const adminguard=()=>{
    const router = inject(Router);
    if(localStorage.getItem('userID')=="2"){
        return true;
    }else{
        router.navigate(['']);
        return false;
    }
}