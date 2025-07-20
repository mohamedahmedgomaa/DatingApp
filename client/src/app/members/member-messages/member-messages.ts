import { ChangeDetectorRef, Component, inject, input, OnInit, output, ViewChild } from '@angular/core';
import { MessageService } from '../../_services/messages';
import { Message } from '../../_models/message';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css'
})
export class MemberMessages {
  @ViewChild('messageForm') messageForm?: NgForm;
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  username = input.required<string>();
  messages = input.required<Message[]>();
  messageContent = '';
  updateMessages = output<Message>();
  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).subscribe({
      next: message => {
        this.updateMessages.emit(message);
        this.messageForm?.reset();
        this.cdr.detectChanges();
      }
    });
  }
}
