import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Member } from '../models/member';
import { updateMember } from '../models/member-update';
import { map, Observable, of, take } from 'rxjs';
import { Photo } from '../models/Photo';
import { PaginatedResult } from '../models/Pagination';
import { UserParams } from '../models/userParams';
import { AuthService } from './auth.service';
import { User } from '../models/login';




// const httpOption = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  user!:User;
  userParams!:UserParams
  memberCash=new Map();
  baseURL:string=environment.baseURL;

  constructor(private http:HttpClient ,private authServices:AuthService) {
    this.authServices.currentUser$.pipe(take(1)).subscribe({
     next:(res)=>{
        if(res){
         this.user=res
          this.userParams=new UserParams(res);
      }

    }
  })
}

  setUserParams(param:UserParams){
    this.userParams=param;
  }
  getUserParams(){
    return this.userParams
  }

  resetUserParams(){
    this.userParams=new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams:UserParams){
   
    var response= this.memberCash.get(Object.values(userParams).join('-'));
    if(response){
      return of(response);
    }
    let params=this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize);
    params=params.append('minAge',userParams.minAge.toString());
    params=params.append('maxAge',userParams.maxAge.toString());
    params=params.append('gender',userParams.gender);
    params=params.append('orderBy',userParams.orderBy);

  return this.getPaginationResult<Member[]>(this.baseURL + 'Accounts/get-all-users',params)
    .pipe(
      map(res=>{
        this.memberCash.set(Object.values(userParams).join('-'),res)
        return res;
      })
    );
  
}

  private getPaginationResult<T>(url:any,params:any) {
    const   paginatedResult:PaginatedResult<T|null>=new PaginatedResult<T|null>();
    return this.http.get<T>(url, { observe: 'response', params })
      .pipe(
        map(response => {
            paginatedResult.result = response.body; 
          let _pagination = response.headers.get('Pagination');  
          if (_pagination !== null) {
            paginatedResult.pagination = JSON.parse(_pagination);   
          }
          return paginatedResult;
        })
      );
  }

private getPaginationHeaders(pageNumber:number,pageSize:number){
  let params=new HttpParams();
  params=params.append('pageNumber',pageNumber.toString());
  params=params.append('pageSize',pageSize.toString());
  return params;
}


  getMember(userName:string){
    // console.log(this.memberCash.values())
    const member=[...this.memberCash.values()]
    .reduce((arr,elem)=>arr.concat(elem.result),[])
    .find((member:Member)=>member.userName === userName);

    if(member){
      return of(member)
    }

    console.log(member)
    return this.http.get<Member>(this.baseURL+`Accounts/get-all-userName/${userName}`);
  }
  updateMember(model:updateMember){
    return this.http.put<updateMember>(this.baseURL+'Accounts/update-current-member',model);
  
  }
  uploadMemberPhoto(fail:any){
    // const params=new HttpParams({fromObject:formDate})
    // return this.http.post(this.baseURL+'Accounts/upload-photo',params.toString(),{
    //   headers:{'Content-Type':'application/x-www-form-urlencoded'}
    // })
     return this.http.post(this.baseURL+'Accounts/upload-photo',fail);
  }
//   uploadMemberPhoto(formData: FormData): Observable<Photo> {
//     return this.http.post<Photo>(`${this.baseURL}Accounts/upload-photo`, formData);
// }

  removeMemberPhoto(id:number){
    return this.http.delete(this.baseURL+`Accounts/deleted-photo/${id}`)
  }
  setMainPhoto(id:number){
    return this.http.put(this.baseURL+`Accounts/set-main-photo/${id}`,null);
  }
}
