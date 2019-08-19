import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient,) { }

  getusers(){
    return this.http.get("http://127.0.0.1:8000/api/users");
  }
  getuserbyid(id){
    return this.http.get("http://127.0.0.1:8000/api/users/" + id + '/');
  }
  patchuser(id, username){
    this.http.patch("http://127.0.0.1:8000/api/users/" + id + '/', username).subscribe((res: Response) => {console.log(res);})
  }
  getemps(){
    return this.http.get("http://127.0.0.1:8000/api/employees");
  }
  getempbyid(id){
    return this.http.get("http://127.0.0.1:8000/api/employees/" + id + '/');
  }

  getdepts(){
    return this.http.get("http://127.0.0.1:8000/api/departments");
  }

  getdeptbyid(id){
    return this.http.get("http://127.0.0.1:8000/api/departments/" + id + '/');
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
}
