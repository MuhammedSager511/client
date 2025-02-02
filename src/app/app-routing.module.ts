import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListsComponent } from './lists/lists.component';
import { authGuard } from './guard/auth.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './guard/prevent-unsaved-changes.guard';
import { MemberDetailsResolver } from './_esolvers/member-details-resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { adminGuard } from './guard/admin.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
      {path:'member',component:MemberListComponent},
      {path:'member/:userName',component:MemberDetailComponent,resolve:{members:MemberDetailsResolver}},
      {path:'members/edit',component:MemberEditComponent,canDeactivate:[preventUnsavedChangesGuard]},
      {path:'lists',component:ListsComponent},
      {path:'message',component:MessagesComponent},
      {path:'admin',component:AdminPanelComponent,canActivate:[adminGuard]},
    ]
  },

  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
