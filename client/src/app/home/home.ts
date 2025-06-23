import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Register } from "../register/register";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  registerMode = false;
  users: any;
  
  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => {
        this.users = response

        this.cdr.detectChanges(); // Force Angular to update the view
      },
      error: error => console.log(error),
      complete: () => console.log("Request has Completed")
    })
  }
}
