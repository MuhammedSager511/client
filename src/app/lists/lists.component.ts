import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { AlertifyService } from '../services/alertify.service';
import { Member } from '../models/member';
import { Pagination } from '../models/Pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  member!: Partial<Member[] | null>
  Pridicate: string = 'liked'
  pageNumber: number = 1;
  pageSize: number = 8;
  pagination: Pagination = { TotalItems: 0, ItemsPerPage: 8, CurrentPage: 1, TotalPages: 0 }; // تعيين القيم الافتراضية

  constructor(private memberService: MembersService, private alert: AlertifyService) {

  }
  ngOnInit(): void {
    this.loadLikes()
  }
  loadLikes() {
    this.memberService.getLikes(this.Pridicate, this.pageNumber, this.pageSize).subscribe({
      next: (res) => {

        this.member = res.result;
        this.pagination = res.pagination
   

      }
    })
  }
  pageChanged(event:any){
    this.pageNumber=event.page
    this.loadLikes()
  }
}
