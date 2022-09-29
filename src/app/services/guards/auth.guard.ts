import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean
  {

    if(!this.authService.isAuth()){
      console.log('Token no es válido o ya expiró');
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
  
}
