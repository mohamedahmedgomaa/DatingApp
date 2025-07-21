import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Admin } from '../../_services/admin';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModal } from '../../modals/roles-modal/roles-modal';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {
  private adminService = inject(Admin);
  private modalService = inject(BsModalService);
  private cdr = inject(ChangeDetectorRef);
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModal> = new BsModalRef<RolesModal>();

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  openRolesModal(user: User) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User roles',
        username: user.username,
        selectedRoles: [...user.roles],
        availableRoles: ['Admin', 'Moderator', 'Member'],
        users: this.users,
        rolesUpdated: false
      }
    }
    this.bsModalRef = this.modalService.show(RolesModal, initialState);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content && this.bsModalRef.content.rolesUpdated) {
          const selectedRoles = this.bsModalRef.content.selectedRoles;
          this.adminService.updateUserRoles(user.username, selectedRoles).subscribe({
            next: roles => {
              user.roles = roles;
              this.cdr.detectChanges();
            }
          })
        }
      }
    })
  }

  getUserWithRoles() {
    this.adminService.getUserWithRoles().subscribe({
      next: users => {
        this.users = users

        this.cdr.detectChanges();
      }
    })
  }
}
