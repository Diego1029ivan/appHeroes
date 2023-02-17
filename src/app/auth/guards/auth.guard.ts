import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad,CanActivate {

  constructor(private authService:AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   if(this.authService.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por el AuthGuard - AuthActivate')
    // return false;
    return this.authService.verificaAutentificacion()
          .pipe(
            tap( estaAutenticado => {
              if(!estaAutenticado){
                this.router.navigate(['./auth/login']);
              }
            })
          );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.authService.verificaAutentificacion()
              .pipe(
                tap( estaAutenticado => {
                  if(!estaAutenticado){
                    this.router.navigate(['./auth/login']);
                  }
                })
              );
    //   if(this.authService.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por el AuthGuard - Canload')
    // return false;
  }
}
