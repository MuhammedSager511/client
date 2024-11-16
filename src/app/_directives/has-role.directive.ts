import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';
import { User } from '../models/login';

@Directive({
  selector: '[appHasRole]' //*appHasRole=["Admin","Member"]
})
export class HasRoleDirective implements OnInit{

  @Input() appHasRole!:string[]
  user!:User
  constructor(private viwecontainerRef:ViewContainerRef
    ,private templateRef:TemplateRef<any>
    ,private authServices:AuthService
  ) { 
    this.authServices.currentUser$.pipe(take(1)).subscribe({
      next:(res)=>{
        if(res){
          this.user=res
        }
      }
    })

  }

  ngOnInit(): void {
    if(!this.user?.roles || this.user?.roles==null){
      this.viwecontainerRef.clear();
      return;
    }
    if(this.user?.roles.some(x=>this.appHasRole.includes(x))){
      this.viwecontainerRef.createEmbeddedView(this.templateRef)
    }
    else{
      this.viwecontainerRef.clear();
    }
  }
}
