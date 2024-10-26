import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Member } from '../models/member';
import { updateMember } from '../models/member-update';



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
  updateMember(model:updateMember){
    return this.http.put<updateMember>(this.baseURL+'Accounts/update-current-member',model);
  }
}
