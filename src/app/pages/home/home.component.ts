import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string = '';

  constructor(
    private authService: AuthService,
  ) { 
    const token = localStorage.getItem('token');
    const { nameid } = decode(token as any) as any;

    this.user = nameid[0];
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
