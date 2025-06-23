import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
import { ChangeDetectorRef } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  accountService = inject(Account);
  private cdr = inject(ChangeDetectorRef);
  model: any = {};
  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cdr.detectChanges(); // Force Angular to update the view
      },
      error: error => console.log(error),
      complete: () => console.log("Request Login has Completed")
    })
  }

  logout() {
    this.accountService.logout();
    this.cdr.detectChanges();
  }
}
