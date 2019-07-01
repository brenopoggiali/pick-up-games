import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        //logic here
        // console.log("VERIFY");
        // console.log(localStorage['token']);

        // var unLogged: boolean = localStorage['token'] === undefined || localStorage['token'] === '' || localStorage['token'] === null;
        var unLogged: boolean = (localStorage['token'] == undefined);
         
        if (unLogged) {
            this.router.navigate(['/login']);
        }

        // var titlee = window.location.pathname;
        // titlee = titlee.substring(1);
        // console.log(titlee);
        // if(titlee.indexOf('login') >= 0 && !unLogged){
        //     this.router.navigate(['']);
        // }

        if (localStorage['token'] !== 'null') {
            return true;
        } else {
            this.router.navigate(['/login']);
        }

    }
}