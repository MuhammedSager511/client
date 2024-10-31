import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation  } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit{

  member!:Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  baseServicesURL:string=environment.baseServicesURL;

  constructor(private memberServices:MembersService
    ,private activteRoute:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.loadMember()
    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          imagePercent:100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview:true
      }]
     
  }

  getImages():NgxGalleryImage[]{
    const imageUrls=[];
    for(const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadMember(){
    let currentURL=this.activteRoute.snapshot.paramMap.get('userName');

    if(currentURL){
      this.memberServices.getMember(currentURL)
      .subscribe({
        next:(res)=>{
          if(res)  {
            this.member=res;
            this.galleryImages=this.getImages();
          }
        },
      })
    }
   
  }
}
