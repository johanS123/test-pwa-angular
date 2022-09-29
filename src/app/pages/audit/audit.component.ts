import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuditService } from '../../services/audit.service';
import { FormComponent } from './components/form/form.component';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

export interface Audits {
  datelog: number;
  idUser: number;
}

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  displayedColumns: string[] = ['date'];
  dataSource: Audits[] = [];
  id: number = 0;

  constructor(
    // private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private auditService: AuditService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') as any, 10);
    this.getListXUser();
    // this.getList();
  }

  // getList() {
  //   this.auditService.get()
  //     .subscribe((resp: any) => {
  //       this.dataSource = resp;
  //     })
  // }

  getListXUser() {
    this.auditService.getxUser(this.id)
      .subscribe((resp: any) => {
        this.dataSource = resp;
      })
  }



  // delete(id: number) {
  //   Swal.fire({
  //     title: '¿Seguro que quieres eliminar el registro?',
  //     showDenyButton: true,
  //     showCancelButton: false,
  //     confirmButtonText: 'Eliminar',
  //     denyButtonText: `Cancelar`,
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       this.userService.delete(id)
  //         .subscribe(() => {
  //           Swal.fire('Saved!', '', 'success')
  //         })
  //     } else if (result.isDenied) {
  //       Swal.fire('Changes are not saved', '', 'info')
  //     }
  //   })
  // }


}
