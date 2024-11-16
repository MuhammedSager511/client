import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModelRolesComponent } from 'src/app/model/model-roles/model-roles.component';
import { User } from 'src/app/models/login';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-managment',
  templateUrl: './admin-managment.component.html',
  styleUrls: ['./admin-managment.component.scss']
})
export class AdminManagmentComponent implements OnInit {
  bsModalRef?: BsModalRef;
  user:Partial<User[]>=[]
  constructor(private adminServices:AdminService,private modalService:BsModalService){
  }
  ngOnInit(): void {
   this.getUserWithRoles()
  }

  getUserWithRoles(){
    this.adminServices.getUserWithRoles().subscribe({
      next:(res)=>{
        if(res){
          this.user=res;
        }
      }
    })
  }
  openRolesModel(user:User){

    const config = {
      class:'modal-dialog-centerd',
      initialState: {
        user,
        roles:this.getRolesArray(user)
      }
    };
    this.bsModalRef = this.modalService.show(ModelRolesComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe({
      next:(values:any)=>{
        const roleToUpade={
          roles:[...values.filter((x:any)=>x.checked===true).map((x:any)=>x.name)]
        }
        if(roleToUpade){
          this.adminServices.updateUserRoles(user.userName,roleToUpade.roles).subscribe({
            next:()=>{
              user.roles=[...roleToUpade.roles]
            }
          })
        }
      }
    })
  
  //  this.modalRef= this.modelServices.show(ModelRolesComponent)
  }
  private getRolesArray(user:User){
    const roles:any[]=[];
    const userRoles=user.roles;
    const avilableRoles:any[]=[
      {name:'Admin',value:'Admin'},
      {name:'Moderator',value:'Moderator'},
      {name:'Member',value:'Member'},
    ]
    avilableRoles.forEach(element => {
      let isMatch=false;
      for(const _userRole of userRoles){
        if(element.name===_userRole){
          isMatch=true;
          element.checked=true;
          roles.push(element);
          break;
        }
      }
      if(!isMatch){
        element.checked=false;
        roles.push(element);
      }
    });
    return roles;
  }
}
