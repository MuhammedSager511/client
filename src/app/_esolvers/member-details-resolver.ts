import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Member } from "../models/member";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MembersService } from "../services/members.service";

@Injectable({
    providedIn:'root'
})

 export class MemberDetailsResolver implements Resolve<Member>{

    constructor(private memberServices:MembersService){}
     resolve(route: ActivatedRouteSnapshot):Observable<Member>|any {
       let _route=route.paramMap.get('userName')
       if(_route){
        return this.memberServices.getMember(_route)
       }
     }
   

 }
 