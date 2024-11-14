import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/assets/environments/environment';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';
import { HtmlParser } from '@angular/compiler';
import { Member } from '../models/member';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseURL:string=environment.baseURL;
  constructor(private http:HttpClient ,private authServices:AuthService) 
  {

   }

   getMessages(pageNumber:number,pageSize:number,container:string){
    let params=getPaginationHeaders(pageNumber,pageSize);
    params=params.append('Container',container);
      return getPaginationResult(this.baseURL+'Messages/get-message-for-user',params,this.http)
   }


   getMessageRead(userName:string){
    return this.http.get<Message[]>(this.baseURL+`Messages/get-message-read/${userName}`)
   }
   sendMessage(userName:string,content:string){
    return this.http.post<Message>(this.baseURL+'Messages/add-message',{recipientUserName:userName,content})
   }
   deleteMessage(id:number){
    return this.http.delete(this.baseURL+'Messages/delete-message/'+id)
   }
}
