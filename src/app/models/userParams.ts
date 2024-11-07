import { User } from "./login";

export class UserParams{
    gender:string;
    minAge=10;
    maxAge=100;
    pageNumber=1;
    pageSize=8;
    orderBy = "lastActive";
    constructor(user:User) {
       this.gender=user.gender==='female'? 'male' :'female'
        
    }
}