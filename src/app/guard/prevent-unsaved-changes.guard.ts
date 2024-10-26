import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component:MemberEditComponent) => {
 
  if(component.editMemerForm.dirty){
    return confirm('Are you sure want to leave , there is un saved date ? ')
  }
  return true;
};
