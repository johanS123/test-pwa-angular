import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  returnUrl: string = '';
  
  constructor(
    private auditService: AuditService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  login() {
    const body = {
      user: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.login(body)
      .subscribe((resp: any) => {
        if (resp?.ok) {
          localStorage.setItem('token', resp.token)

          this.auditService.post(resp.data?.id)
            .subscribe(console.log)

          this.router.navigate([this.returnUrl]);
        } else {
          console.log(resp, 'hey')
        }
      }, err => {
        console.log(err.error)
        Swal.fire({
          title: 'Error!',
          text: `${err.error.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      })
  }
}
