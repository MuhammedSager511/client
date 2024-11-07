import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/models/login';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/Pagination';
import { UserParams } from 'src/app/models/userParams';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  member:Member[]|null=null;
  pagination: Pagination = { TotalItems: 0, ItemsPerPage: 8, CurrentPage: 1, TotalPages: 0 }; // تعيين القيم الافتراضية

  user!:User;
  userParams!:UserParams
  genderList=[
    {key:'male',value:'Males'},
    {key:'female',value:'Females'}
  ]

  constructor(private memberservices:MembersService){
   this.userParams=this.memberservices.getUserParams()
  }


  ngOnInit(): void {
    this.getMembers()
  }

  getMembers() {
    this.memberservices.setUserParams(this.userParams)
    this.memberservices.getMembers(this.userParams).subscribe({
      next: (res) => {
        this.member = res.result;
        this.pagination = res.pagination ; 
        
    
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  

  pageChanged(event:any){
    this.memberservices.setUserParams(this.userParams)
    this.userParams.pageNumber=event.page
    this.getMembers()
   
  }
  resetFilter(){
    this.userParams=this.memberservices.resetUserParams()
    // this.userParams=new UserParams(this.user);
    this.getMembers()
  }
}
