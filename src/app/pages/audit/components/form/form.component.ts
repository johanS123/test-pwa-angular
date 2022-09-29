import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditService } from '../../../../services/audit.service';
import Swal from 'sweetalert2';
import { AuditComponent } from '../../audit.component';
import { UserService } from '../../../../services/user.service';


interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  roles: Roles[] = [
    {value: 'ADMIN', viewValue: 'Administrador'},
    {value: 'USER', viewValue: 'Usuario'},
  ];

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  nameForm: string = 'Crear';

  constructor(
    private userService: UserService,
    // private auditService: AuditService,
    public dialogRef: MatDialogRef<AuditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data?.id) {
      this.nameForm = 'Editar'
      
      let { firstname, lastname, email, password, role } = this.data;
    
      this.form = new FormGroup({
        firstname: new FormControl(firstname, Validators.required),
        lastname: new FormControl(lastname, Validators.required),
        email: new FormControl(email, Validators.required),
        password: new FormControl(password, Validators.required),
        role: new FormControl(role, Validators.required)
      });
    } else {
      this.nameForm = 'Crear'
    }
  }

  _bodyMapped() {
    let { firstname, lastname, email, password, role } = this.form.value;

    const body = {
      id: 0,
      firstname,
      lastname,
      email,
      password,
      confirmPassword: password,
      salt: this.data?.id ? this.data.salt : '',
      role,
    }

    return body;
  }

  action() {
    if (!this.data?.id) {
      this.created()
    } else {
      this.update()
    }
  }

  created() {    
    this.userService.post(this._bodyMapped())
      .subscribe(resp => {
        this.form.reset();
        this.dialogRef.close();
      }, console.error, () => {
        Swal.fire('Exitoso!!', 'Se he creado correctamente el usuario', 'success')
      })
  }

  update() {
    this.userService.put(this.data.id, this._bodyMapped())
      .subscribe(resp => {
        this.form.reset();
        this.dialogRef.close();
      }, console.error, () => {
        Swal.fire('Exitoso!!', 'Se he modificado correctamente el usuario', 'success')
      })
  }
}
