import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router
  ){ }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data["expectedRole"];
    const token = localStorage.getItem('token');

    const { nameid } = decode(token as any) as any;
    console.log(nameid[1]);

    if( !this.authService.isAuth() || nameid[1] !== expectedRole){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
