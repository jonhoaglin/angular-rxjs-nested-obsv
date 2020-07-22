import { Injectable } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap, filter, map, mergeAll, scan, tap } from 'rxjs/operators';

import { AccountBalanceService } from './account-balance.service';
import { AppAccount } from './account.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AccountHelperService {

  constructor(
    private accountService: AccountService,
    private balanceService: AccountBalanceService
  ) { }

getActualBalance(account: AppAccount): Observable<number> {
    return this.balanceService.balances$.pipe(
      map(balances => {
        let last = balances.filter(balance => {
          return balance.accountId === account._id;
        }).sort().pop();
        //console.log(last)
        return last ? last.amount : 0;
      }),
      tap(balance => console.log(`getActualBalance() => ${balance}`)),
    );
  }

getTotalBalance(accounts$: Observable<AppAccount[]>): Observable<number> {
    return accounts$.pipe(
      map(accounts => accounts.map(account => this.getActualBalance(account))),
      concatMap(balances$ => { console.log('balances$', balances$); return forkJoin(balances$); }),
      tap(balances => console.log('balances', balances)),
      map(balances => balances.reduce(
        (amountSum, amount) => {
          console.log(`${amountSum} + ${amount}`)
          amountSum = amountSum + amount;
          return amountSum
        }, 0))
    );
  }
  }