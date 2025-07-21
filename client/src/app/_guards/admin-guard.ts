import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Account } from '../_services/account';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(Account);
  const toastr = inject(ToastrService);

  if (accountService.roles().includes('Admin') || accountService.roles().includes('Moderator')) {
    return true;
  } else {
    toastr.error('You cannot enter this erea');
    return false;
  }
};
