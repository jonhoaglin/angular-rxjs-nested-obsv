import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppAccount } from './account.model';
import { AccountHelperService } from './account-helper.service';
import { AccountService } from './account.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  accounts$: Observable<AppAccount[]>

  constructor(
    private accountService: AccountService,
    private accountHelperService: AccountHelperService
  ){
    this.accounts$ = this.accountService.accounts$;
  }

  getTotalBalance() {
    return this.accountHelperService.getTotalBalance(this.accounts$).pipe(map(total => { console.log(total); return total; }))
  }
}
