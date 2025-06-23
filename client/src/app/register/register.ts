import { ChangeDetectorRef, Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);
  model: any = {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
        this.cdr.detectChanges(); // Force Angular to update the view
      },
      error: error => this.toastr.error(error.error),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
