import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './shared/home/home.component';
import { AdministrationComponent } from './admin/administration/administration.component';
import { AuthGuard } from './auth/auth.guard';
import { EmployeeDetailsComponent } from './shared/employee-details/employee-details.component';
import { MembersComponent } from './admin/members/members-list/members.component';
import { DepartmentsComponent } from './admin/departments/department-list/departments.component';
import { EditDepartmentComponent } from './admin/departments/edit-department/edit-department.component';
import { EditMemberComponent } from './admin/members/edit-member/edit-member.component';
import { CreateDepartmentComponent } from './admin/departments/create-department/create-department.component';
import { CreateMemberComponent } from './admin/members/create-member/create-member.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard]},
  { path: 'emp-details/:id', component: EmployeeDetailsComponent},
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'edit-dept/:id', component: EditDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'edit-emp/:id', component: EditMemberComponent, canActivate: [AuthGuard] },
  { path: 'create-dept', component: CreateDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'create-emp', component: CreateMemberComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
