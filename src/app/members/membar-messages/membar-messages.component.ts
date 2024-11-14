import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/models/message';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-membar-messages',
  templateUrl: './membar-messages.component.html',
  styleUrls: ['./membar-messages.component.scss']
})
export class MembarMessagesComponent implements OnInit{

  @ViewChild('messageForm') messageForm!:NgForm
  @Input()   message!:Message[]
  @Input() userName!:string;
  messageContent!:string
  constructor(private messageServices:MessageService){

  }
  ngOnInit(): void {
  }

  sendMessage(){
    this.messageServices.sendMessage(this.userName,this.messageContent).subscribe({
      next:(res)=>{
        this.message.push(res)
        this.messageForm.reset()
      }    
    })
  }
}
