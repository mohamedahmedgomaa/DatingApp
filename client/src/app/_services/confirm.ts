import { inject, Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmDialog } from '../modals/confirm-dialog/confirm-dialog';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Confirm {
  bsModalRef?: BsModalRef;
  private modalService = inject(BsModalService);

  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkText = 'Ok',
    btnCancelText = 'Cancel'
  ) {
    const config: ModalOptions = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText
      }
    };

    this.bsModalRef = this.modalService.show(ConfirmDialog, config);

    return this.bsModalRef.onHidden?.pipe(
      map(() => {
        if (this.bsModalRef?.content) {
          return this.bsModalRef.content.result
        } else return false;
      })
    )
  }
}
