import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface BodyUsers {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  salt: string;
  role: string;
}

const API_URL_USERS= `${environment.apiUrl}/Users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  get() {
    return this.http.get(`${API_URL_USERS}`);
  }

  post(body: BodyUsers) {
    return this.http.post(`${API_URL_USERS}`, body)
  }

  put(id: number, body: BodyUsers) {
    body.id = id;
    return this.http.put(`${API_URL_USERS}/${id}`, body)
  }

  delete(id: number) {
    return this.http.delete(`${API_URL_USERS}/${id}`);
  }

}
