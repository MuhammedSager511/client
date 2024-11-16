import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/models/member';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MembersService } from 'src/app/services/members.service';
import { PresenceService } from 'src/app/services/presence.service';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {
  @ViewChild('memberTabs') memberTabs!:TabsetComponent
  @Input() member!:Member;
  baseServicesURL:string=environment.baseServicesURL;

  constructor(private memberService:MembersService
             ,private alert:AlertifyService
             ,public presence:PresenceService){

  }
  addLike(member:Member){
    this.memberService.addLike(member.userName).subscribe({
      next:(res)=> {
          this.alert.success("Added Successfully")
      },
      error:(err)=>{
        console.log(err)
        this.alert.error(err.error);
        
      }
    })
  }
  slectTab(tabId: number) {
    if (this.memberTabs && this.memberTabs.tabs[tabId]) {
      this.memberTabs.tabs[tabId].active = true;
    }
  }
}
