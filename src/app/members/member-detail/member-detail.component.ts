import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation  } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { User } from 'src/app/models/login';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';
import { MessageService } from 'src/app/services/message.service';
import { PresenceService } from 'src/app/services/presence.service';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit,OnDestroy{

  @ViewChild('memberTabs') memberTabs!:TabsetComponent
  member!:Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  baseServicesURL:string=environment.baseServicesURL;
  activeTab!:TabDirective
  user!:User
  message:Message[]=[]

  constructor(public presence:PresenceService,private messageService:MessageService
    ,private activtedRoute:ActivatedRoute,private authServices:AuthService
  ){
    this.authServices.currentUser$.pipe(take(1)).subscribe(user=>{
      if(user){
        this.user=user
      }
    })
  }
  ngOnInit(): void {
    
    this.activtedRoute.data.subscribe({
      next: (res: any) => {
       
          this.member = res.members;
          this.galleryImages = this.getImages();
        
      }
    });
    
    


    this.activtedRoute.queryParams.subscribe({
      next:(res:any)=>{
        res.tab ? this.slectTab(res.tab):this.slectTab(0)
      }
      });
  
  

    // this.loadMember()
    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          imagePercent:100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview:true
      }]
     
  }

  getImages():NgxGalleryImage[]{
    const imageUrls=[];
    for(const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }
  
  
  // loadMember(){
  //   let currentURL=this.activteRoute.snapshot.paramMap.get('userName');
  
  //   if(currentURL){
  //     this.memberServices.getMember(currentURL)
  //     .subscribe({
  //       next:(res)=>{
  //         if(res)  {
  //           this.member=res;
  //           this.galleryImages=this.getImages();
  //         }
  //       },
  //     })
  //   }
   
  // }
  loadMessages(){
    this.messageService.getMessageRead(this.member.userName).subscribe({
      next:(res)=>{
        this.message=res
      }
    })
  }
  noTabActivator(data:TabDirective){
    this.activeTab=data
    if(this.activeTab.heading=='Messages' &&this.message.length===0){
      // this.loadMessages()
      this.messageService.createHubConnction(this.user,this.member.userName)
    }
    else{
      this.messageService.stopHubConnction()
    }
  }

  slectTab(tabId: number) {
    if (this.memberTabs && this.memberTabs.tabs[tabId]) {
      this.memberTabs.tabs[tabId].active = true;
    }
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnction()
  }
  
}
