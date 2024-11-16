import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/assets/environments/environment';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';
import { HtmlParser } from '@angular/compiler';
import { Member } from '../models/member';
import { Message } from '../models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { User } from '../models/login';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseURL:string=environment.baseURL;
  hubURL:string=environment.hubUrl;
  
  private hubConnection!:HubConnection;
  private messageReadSource=new BehaviorSubject<string[]>([]);
  messageRead$=this.messageReadSource.asObservable();


  constructor(private http:HttpClient ,private authServices:AuthService,private alert:AlertifyService) 
  {

   }

   createHubConnction(user:User,otherUserName:string){
    this.hubConnection=new HubConnectionBuilder()
    .withUrl(this.hubURL+'message?user='+otherUserName,{
      accessTokenFactory:()=>user.token
    })
    .withAutomaticReconnect().build()

    this.hubConnection.start().catch(err=>console.log(err))
   
    this.hubConnection.on("ReceivedMessageRead",message=>{
      this.messageReadSource.next(message);
    })
    this.hubConnection.on("NewMessage",message=>{
      this.messageRead$.pipe(take(1)).subscribe(messages=>{
        this.messageReadSource.next([...messages,message])
      })
    })

    
  }

  stopHubConnction(){
    if(this.hubConnection){
      this.hubConnection.stop().catch(err=>console.log(err))

    }
  }


   getMessages(pageNumber:number,pageSize:number,container:string){
    let params=getPaginationHeaders(pageNumber,pageSize);
    params=params.append('Container',container);
      return getPaginationResult(this.baseURL+'Messages/get-message-for-user',params,this.http)
   }


   getMessageRead(userName:string){
    return this.http.get<Message[]>(this.baseURL+`Messages/get-message-read/${userName}`)
   }
  async sendMessage(userName:string,content:string){
    return this.hubConnection.invoke('SendMessage',{recipientUserName:userName,content})
    .catch(err=>console.log(err)
    )
   }
   deleteMessage(id:number){
    return this.http.delete(this.baseURL+'Messages/delete-message/'+id)
   }
}