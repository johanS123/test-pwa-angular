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

interface BodyAudits {
  id: number;
  datelog: string;
  idUser: number;
  users: BodyUsers;
}

const API_URL_AUDITS = `${environment.apiUrl}/Audits`;

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(
    private http: HttpClient
  ) { }

  get() {
    return this.http.get(`${API_URL_AUDITS}`);
  }

  getxUser(idUser: number) {
    return this.http.get(`${API_URL_AUDITS}/user/${idUser}`);
  }

  post(idUser: number) {
    return this.http.post(`${API_URL_AUDITS}/${idUser}`, {});
  }


    // post(body: BodyUsers) {
    //   return this.http.post(`${API_URL}/Users`, body)
    // }

    // put(id: number, body: BodyUsers) {
    //   body.id = id;
    //   return this.http.put(`${API_URL}/Users/${id}`, body)
    // }

    // delete(id: number) {
    //   return this.http.delete(`${API_URL}/Users/${id}`);
    // }

}
