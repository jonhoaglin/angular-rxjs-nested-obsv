import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { AppAccount } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
accounts: AppAccount[] = [{_id: '1', name: 'test account'}]; //This would come from an http response in the actual app

  private _accounts$ = new BehaviorSubject<AppAccount[]>(this.accounts);

  get accounts$() { return this._accounts$.asObservable(); }
}