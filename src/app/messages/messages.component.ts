import { Component, OnInit } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { MessageService } from '../services/message.service';
import { AlertifyService } from '../services/alertify.service';
import { Message } from '../models/message';
import { Pagination } from '../models/Pagination';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  message!:Message[]|null;
  pagination!: Pagination;
  // pagination: Pagination = { TotalItems: 0, ItemsPerPage: 8, CurrentPage: 1, TotalPages: 0 }; // تعيين القيم الافتراضية
  container:string="Inbox";
  pageSize:number=8;
  pageNumber:number=1;
  loading:boolean=false
  baseServicesURL:string=environment.baseServicesURL;
  constructor(private messageService:MessageService,private alert:AlertifyService){

  }
  ngOnInit(): void {
    this.loadMessage();
  }
  
  loadMessage(): void {
    this.loading=true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: (res) => {
        console.log('Messages Response:', res); // تحقق من البيانات هنا
        if (res && Array.isArray(res.result)) {
          this.message = res.result;  // تعيين الرسائل المستلمة
          this.pagination = res.pagination;
          this.loading=false
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        this.alert.error('حدث خطأ في تحميل الرسائل.');
      }
    });
  }
  deleteMessage(id:number){
    let _index=this.message?.findIndex(x=>x.id===id);
    this.messageService.deleteMessage(id).subscribe({
      next:()=>{
        if(_index){
          this.message?.splice(_index,1);

        }
      }
    })
  }
  pageChanged(e:any){
    this.pageNumber=e.page;
    this.loadMessage()
  }
}
