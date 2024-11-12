import { Component, Input } from '@angular/core';
import { Member } from 'src/app/models/member';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MembersService } from 'src/app/services/members.service';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {

  @Input() member!:Member;
  baseServicesURL:string=environment.baseServicesURL;
  constructor(private memberService:MembersService,private alert:AlertifyService){

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
}
