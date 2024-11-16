import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/assets/environments/environment';
import { User } from '../models/login';
import { createLogger } from '@microsoft/signalr/dist/esm/Utils';
import { AlertifyService } from './alertify.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
    hubURL:string=environment.hubUrl;

    private hubConnection!:HubConnection;
    private onlineUsersSource=new BehaviorSubject<string[]>([]);
    onlineUsers$=this.onlineUsersSource.asObservable();



    constructor(private alert:AlertifyService) { }


    createHubConnction(user:User){
      this.hubConnection=new HubConnectionBuilder()
      .withUrl(this.hubURL+'presence',{
        accessTokenFactory:()=>user.token
      })
      .withAutomaticReconnect().build()

      this.hubConnection.start().catch(err=>console.log(err))

      this.hubConnection.on("UserIsOnline",userName=>{
        this.alert.success(`this user ${userName} connected`)
      })
      this.hubConnection.on("UserIsOffline",userName=>{
        this.alert.warning(`this user ${userName} disconnected`)
      })
      this.hubConnection.on("GetOnlineUsers",(userName:string[])=>{
        this.onlineUsersSource.next(userName);
      })
    }

    stopHubConnction(){
      this.hubConnection.stop().catch(err=>console.log(err))

    }
}
