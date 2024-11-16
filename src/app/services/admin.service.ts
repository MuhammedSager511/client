import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { User } from '../models/login';
import { HtmlParser } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL:string=environment.baseURL;
  constructor(private http:HttpClient) 
  {
  }
  getUserWithRoles(){
    return this.http.get<Partial<User[]>>(this.baseURL+'Admin/get-users-with-roles')
  }
  updateUserRoles(userName:string,roles:string[]){
    return this.http.post(this.baseURL+'Admin/update-roles/'+userName+'?roles='+roles,{})
  }
}
