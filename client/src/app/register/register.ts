import { ChangeDetectorRef, Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private accountService = inject(Account);
  cancelRegister = output<boolean>();
  private cdr = inject(ChangeDetectorRef);
  model: any = {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
           this.cdr.detectChanges(); // Force Angular to update the view
      },
      error: error => console.log(error),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
