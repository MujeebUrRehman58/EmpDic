import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DepartmentsComponent } from './admin/departments/department-list/departments.component';
import { HomeComponent } from './shared/home/home.component';
import { AdministrationComponent } from './admin/administration/administration.component';
import { EmployeeDetailsComponent } from './shared/employee-details/employee-details.component';
import { MembersComponent } from './admin/members/members-list/members.component';
import { EditDepartmentComponent } from './admin/departments/edit-department/edit-department.component';
import { CreateDepartmentComponent } from './admin/departments/create-department/create-department.component';
import { CreateMemberComponent } from './admin/members/create-member/create-member.component';
import { EditMemberComponent } from './admin/members/edit-member/edit-member.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor'
import { AuthService } from './auth/auth.services'
import { ErrorInterceptor } from './auth/error.interceptor'


@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    HomeComponent,
    AdministrationComponent,
    EmployeeDetailsComponent,
    MembersComponent,
    EditDepartmentComponent,
    CreateDepartmentComponent,
    CreateMemberComponent,
    EditMemberComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
