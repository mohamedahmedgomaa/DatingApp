import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManagement } from "../user-management/user-management";
import { HasRole } from '../../_directives/has-role';
import { PhotoManagement } from "../photo-management/photo-management";

@Component({
  selector: 'app-admin-panel',
  imports: [TabsModule, UserManagement, HasRole, PhotoManagement],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel {

}
