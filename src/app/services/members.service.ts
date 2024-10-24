import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Member } from '../models/member';



// const httpOption = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseURL:string=environment.baseURL;
  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseURL+'Accounts/get-all-users');
  }

  getMember(userName:string){
    return this.http.get<Member>(this.baseURL+`Accounts/get-all-userName/${userName}`);
  }
}
