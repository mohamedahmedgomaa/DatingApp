import { AfterViewChecked, ChangeDetectorRef, Component, inject, input, OnInit, output, ViewChild } from '@angular/core';
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
export class MemberMessages implements AfterViewChecked{
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scrollMe') scrollContainer?: any;
  messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  username = input.required<string>();
  messageContent = '';

  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
      this.scrollToButtom();
    })
  }

  ngAfterViewChecked(): void {
      this.scrollToButtom();
  }

  private scrollToButtom() {
    if( this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
