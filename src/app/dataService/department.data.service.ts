import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DepartmentDataService {
    private urlPrefix: string = environment.baseUrl + 'api/departments/';
    constructor(
        private http: HttpClient,
    ) { }

    getDepartments() {
        return this.http.get(this.urlPrefix);
    }

    getDepartmentById(id) {
        return this.http.get(this.urlPrefix + id + '/');
    }

    postDepartment(name) {
        return this.http.post(this.urlPrefix, name);
    }

    patchDepartment(id, name) {
        return this.http.patch(this.urlPrefix + id + '/', name);
    }

    deleteDepartment(id) {
        return this.http.delete(this.urlPrefix + id + '/');
    }

    DoesDepartmentExist(data) {
        let url = '';
        if (data.id) {
            url = '?department_name=' + data.department_name + '&id=' + data.id;
        } else {
            url = '?department_name=' + data.department_name;
        }
        return this.http.get(this.urlPrefix + url);
    }
}