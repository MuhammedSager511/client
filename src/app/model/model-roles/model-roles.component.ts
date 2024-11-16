import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/login';

@Component({
  selector: 'app-model-roles',
  templateUrl: './model-roles.component.html',
  styleUrls: ['./model-roles.component.scss']
})
export class ModelRolesComponent {

  @Input() updateSelectedRoles=new EventEmitter();
  user!:User
  roles!:any[];
  constructor(public bsModalRef:BsModalRef){
  }
  updateRoles(){
    this.updateSelectedRoles.emit(this.roles)
    this.bsModalRef.hide();
  }
}
