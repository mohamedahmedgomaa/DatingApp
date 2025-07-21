import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Account } from '../_services/account';

@Directive({
  selector: '[appHasRole]'
})
export class HasRole implements OnInit {
  @Input() appHasRole: string[] = [];
  private accountService = inject(Account);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);
  
  ngOnInit(): void {
    if(this.accountService.roles()?.some((r: string) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }
}
