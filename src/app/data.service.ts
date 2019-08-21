import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient,) { }

  async getusers(){
    return await this.http.get("http://127.0.0.1:8000/api/users").toPromise();
  }
  async getuserbyid(id){
    return await this.http.get("http://127.0.0.1:8000/api/users/" + id + '/').toPromise();
  }
  patchuser(id, username){
    this.http.patch("http://127.0.0.1:8000/api/users/" + id + '/', username).subscribe((res: Response) => {console.log(res);})
  }
  async getemps(){
    return await this.http.get("http://127.0.0.1:8000/api/employees").toPromise();
  }
  async getempbyid(id){
    return await this.http.get("http://127.0.0.1:8000/api/employees/" + id + '/').toPromise();
  }

  async getdepts(){
    return await this.http.get("http://127.0.0.1:8000/api/departments").toPromise();
  }

  async getdeptbyid(id){
    return await this.http.get("http://127.0.0.1:8000/api/departments/" + id + '/').toPromise();
  }

  postdept(name){
    this.http.post("http://127.0.0.1:8000/api/departments/", name).subscribe((res: Response) => {console.log(res);})
  }
  
  patchdept(id, name){
    this.http.patch("http://127.0.0.1:8000/api/departments/" + id + '/', name).subscribe((res: Response) => {console.log(res);})
  }
  
  patchemp(id, data){
    this.http.patch("http://127.0.0.1:8000/api/employees/" + id + '/', data).subscribe((res: Response) => {console.log(res);})
  }

  deletedept(id){
    return this.http.delete("http://127.0.0.1:8000/api/departments/" + id + '/').subscribe((res: Response) => {console.log(res);})
  }

  deleteemp(id){
    return this.http.delete("http://127.0.0.1:8000/api/employees/" + id + '/').subscribe((res: Response) => {console.log(res);})
  }
  set_manofmonth(){
    return this.http.get("http://127.0.0.1:8000/api/employees/set_manofmonth/").subscribe((res: Response) => {console.log(res);})
  }
  userexists(data){
    return this.http.post("http://127.0.0.1:8000/api/users/userexists/", data)
  }
  getdeptbyname(data){
    console.log(data)
    return this.http.post("http://127.0.0.1:8000/api/departments/getdeptbyname/", data)
  }
  postemp(data){
    return this.http.post("http://127.0.0.1:8000/api/employees/", data).subscribe((res: Response) => {console.log(res);})
  }
  postuser(data){
    return this.http.post("http://127.0.0.1:8000/api/users/", data)
  }
}
