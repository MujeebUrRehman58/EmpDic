import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  urlPrefix = environment.baseUrl + 'api/users/';

  constructor(
    private http: HttpClient,
    ) { }

  getUsers() {
    return this.http.get(this.urlPrefix);
  }

  getUserById(id) {
    return this.http.get(this.urlPrefix + id + '/');
  }

  deleteUser(id){
    return this.http.delete(this.urlPrefix + id + '/');
  }

  patchUser(id, data){
    return this.http.patch(this.urlPrefix + id + '/', data)
  }

  postUser(data){
    return this.http.post(this.urlPrefix, data)
  }

  loginUser(data){
    return this.http.post(environment.baseUrl + 'token/', data)
  }

  doesUserExist(data){
    let url = '';
    if (data.id) {
      url = '?username=' + data.username + '&id=' + data.id;
    } else {
      url = '?username=' + data.username;
    }
    return this.http.get(this.urlPrefix + url)
  }
}
