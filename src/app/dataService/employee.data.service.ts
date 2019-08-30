import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  urlPrefix = environment.baseUrl + 'api/employees/';

  constructor(
    private http: HttpClient,
    ) { }

  getEmployees() {
    return this.http.get(this.urlPrefix);
  }
  getEmploeeById(id) {
    return this.http.get(this.urlPrefix + id + '/');
  }
  patchEmployee(id, data) {
    return this.http.patch(this.urlPrefix + id + '/profile/', data);
  }
  postEmployee(data) {
    return this.http.post(this.urlPrefix, data);
  }
  searchMember(data) {
    const url = '?username=' + data.username + '&full_name=' + data.full_name + '&man_of_month=' + data.man_of_month;
    return this.http.get(this.urlPrefix + url);
  }
  searchEmployee(data) {
    const url = '?email=' + data.email + '&full_name=' + data.full_name + '&department_name=' + data.department_name;
    return this.http.get(this.urlPrefix + url);
  }
  searchManOfMonth(data) {
    const url = '?man_of_month=' + data.man_of_month;
    return this.http.get(this.urlPrefix + url);
  }
  putEmployee(id, data) {
    return this.http.put(this.urlPrefix + id + '/', data);
  }
}
