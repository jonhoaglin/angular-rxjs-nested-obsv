import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { AccountBalance } from './account-balance.model';

@Injectable({
  providedIn: 'root'
})
export class AccountBalanceService {
balances: AccountBalance[] = [{_id: '1', accountId: '1', amount: 10}]; //This would come from an http response in the actual app

  private _balances$ = new BehaviorSubject<AccountBalance[]>(this.balances);

  get balances$() { return this._balances$.asObservable(); }
}