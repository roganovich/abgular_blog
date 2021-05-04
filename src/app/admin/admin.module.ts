import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { AdminLayoutComponent } from 'src/app/admin/shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from 'src/app/admin/login-page/login-page.component';
import { DashboardPageComponent } from 'src/app/admin/dashboard-page/dashboard-page.component';
import { EditPageComponent } from 'src/app/admin/pages/edit-page/edit-page.component';
import { CreatePageComponent } from 'src/app/admin/pages/create-page/create-page.component';
import { ListPagesComponent } from 'src/app/admin/pages/list-pages/list-pages.component';
import {SharedModule} from 'src/app/shared/shared.module'
import { AuthGuard } from 'src/app/shared/services/auth.guard';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    CreatePageComponent,
    ListPagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate:[AuthGuard]},
          {path: 'pages/list', component: ListPagesComponent, canActivate:[AuthGuard]},
          {path: 'pages/create', component: CreatePageComponent, canActivate:[AuthGuard]},
          {path: 'pages/:id/edit', component: EditPageComponent, canActivate:[AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminModule {
}
