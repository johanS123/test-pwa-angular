import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { AuditComponent } from './pages/audit/audit.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RoleGuard } from './services/guards/role.guard';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: { expectedRole: 'ADMIN' },
        canActivate: [RoleGuard]
      },
      {
          path: 'audit/:id',
          component: AuditComponent,
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
