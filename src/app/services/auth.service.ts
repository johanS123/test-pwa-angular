import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { routes } from '../app-routing.module';
import { Router } from '@angular/router';

interface BodyLogin {
  user: string;
  password: string;
}

const API_URL = `https://localhost:7071/api`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private jwtHelper: JwtHelperService
  ) { }

    read() {

    }

    login(body: BodyLogin) {
      return this.http.post(`${API_URL}/Login`, body);
    }

    // isAuthenticated(): boolean {
    //   const token = localStorage.getItem('token');
      
    // }

    logout() {
      localStorage.removeItem("token");
      this.router.navigate(['auth']);
    }

    isAuth():boolean {
      const token = localStorage.getItem('token');
      if(this.jwtHelper.isTokenExpired(token as any) || !localStorage.getItem('token')){
        return false;
      }
      return true;
    }

}
