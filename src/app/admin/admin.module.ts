import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ListPagesComponent } from './pages/list-pages/list-pages.component';
import {SharedModule} from '../shared/shared.module'


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
          {path: 'dashboard', component: DashboardPageComponent},
          {path: 'post/list', component: ListPagesComponent},
          {path: 'post/create', component: CreatePageComponent},
          {path: 'post/:id/edit', component: EditPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AdminModule {
}
