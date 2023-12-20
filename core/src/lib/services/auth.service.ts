import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { catchError, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service';

import { ENV } from './env.service';
import { isClient, isCandidate, isManager } from '@webui/utilities';
import { EventService, EventType } from './event.service';
import { Endpoints, IRole, User } from '@webui/models';
import { SubscriptionService } from './subscription.service';

interface AuthResponse {
  access_token: string;
  access_token_jwt: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _role?: IRole;

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private error: ErrorsService,
    private router: Router,
    private eventService: EventService,
    private subscriptionService: SubscriptionService,
    @Optional() @Inject(ENV) private env: any
  ) {}

  set role(role: IRole | undefined) {
    this._role = role;
  }

  get role(): IRole | undefined {
    return this._role;
  }

  get isAuthorized(): boolean {
    return !!this.storage.retrieve('user');
  }

  public storeToken(response: any, rememberMe?: boolean, username?: string) {
    const data: AuthResponse = response.data || response || {};

    const {
      access_token = '',
      access_token_jwt = '',
      refresh_token = '',
    } = data;
    this.storage.store('user', {
      access_token,
      refresh_token,
      access_token_jwt,
      rememberMe,
      username,
    });
  }

  public getRedirectUrl(): string {
    if (isClient()) {
      return 'cl';
    }

    if (isCandidate()) {
      return 'cd';
    }

    if (isManager()) {
      return 'mn';
    }

    return '';
  }

  public refreshJWTToken(user: User) {
    const { refresh_token = '', username = '' } = { ...user };
    const body = {
      refresh_token,
      username,
      client_id: this.env.clientId,
      grant_type: 'refresh_token',
    };

    return this.http.post(Endpoints.TokenRefresh, body).pipe(
      tap((response: any) => {
        this.storage.store('user', {
          ...user,
          access_token: response.access_token_jwt,
          refresh_token: response.refresh_token,
        });
      }),
      catchError((error: any) => this.error.handleError(error))
    );
  }

  public loginWithToken(token: string) {
    const url = `/auth/${token}/login_by_token/`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        this.storeToken(response);
      }),
      catchError((error: any) => this.error.handleError(error))
    );
  }

  public logoutWithoutRedirect() {
    this.storage.clear('role');
    this.storage.clear('user');
  }

  public logout() {
    this.eventService.emit(EventType.Logout);
    this.storage.clear('role');
    this.storage.clear('user');
    this.subscriptionService.clean();
    this.router.navigateByUrl('/login');
  }
}
