import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../audit/components/form/form.component';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import decode from 'jwt-decode';

export interface Users {
  id: string;
  firstname: number;
  lastname: number;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'details', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Users>;

  isLoadingResults = true;

  validRole: boolean = false;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {
    const token = localStorage.getItem('token');

    const { nameid } = decode(token as any) as any;

    if (nameid[1] === "ADMIN") {
      this.validRole = true;
    } else {
      this.validRole = false;
    }

   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.getList();
  }

  getList() {
    this.userService.get()
      .subscribe((resp: any) => {
        this.dataSource = new MatTableDataSource<Users>(resp);
        this.dataSource.paginator = this.paginator;
      })
  }

  openDialog(element: Object = {}): void {
    this.dialog.open(FormComponent, {
      width: '350px',
      data: element
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.delete(id)
          .subscribe(() => {
            Swal.fire('Saved!', '', 'success')
          })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
