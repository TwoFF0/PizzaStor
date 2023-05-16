import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { take } from 'rxjs';
import { UserAuth } from 'src/app/data/models/User/UserAuth';
import { AccountService } from 'src/app/data/services/account.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: UserAuth;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    if (!this.user?.roles || this.user === null) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.user?.roles.some((r) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
