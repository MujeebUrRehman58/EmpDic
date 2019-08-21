import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdministrationComponent } from './administration/administration.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { MembersComponent } from './members/members.component';
import { EditDeptComponent } from './edit-dept/edit-dept.component';
import { CreateDeptComponent } from './create-dept/create-dept.component';
import { CreateEmpComponent } from './create-emp/create-emp.component';
import { EditEmpComponent } from './edit-emp/edit-emp.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    HomeComponent,
    AdministrationComponent,
    EmpDetailsComponent,
    MembersComponent,
    EditDeptComponent,
    CreateDeptComponent,
    CreateEmpComponent,
    EditEmpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'administration', component: AdministrationComponent },
      { path: 'emp-details/:id', component: EmpDetailsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'edit-dept/:id', component: EditDeptComponent },
      { path: 'edit-emp/:id', component: EditEmpComponent },
      { path: 'create-dept', component: CreateDeptComponent },
      { path: 'create-emp', component: CreateEmpComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
