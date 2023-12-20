import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import * as Sentry from '@sentry/angular-ivy';
import { Integrations } from '@sentry/tracing';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import './polyfills';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { MissingTranslationHelper } from './app/helpers/translate.helper';
import { HttpLoaderFactory } from './app/translate.loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { forkJoin, of, tap } from 'rxjs';
import {
  ENV,
  FormService,
  GenericFormService,
  guards,
  JiraService,
  SiteSettingsService,
  UserService,
} from '@webui/core';
import { catchError } from 'rxjs/operators';
import { NoPreloading, RouterModule } from '@angular/router';
import { interceptors } from '@webui/core';
import { routes } from './app/app.routing';
import { MetadataService } from '@webui/metadata';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@angular/cdk/dialog';

Sentry.init({
  dsn: 'https://c149325c0a1347d398995cc08ada38e0@o276502.ingest.sentry.io/5797823',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['https://piipaitest.com'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
    new Sentry.Integrations.Breadcrumbs({
      console: false,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory:
        (
          userService: UserService,
          siteSettings: SiteSettingsService,
          jiraService: JiraService
        ) =>
        () =>
          forkJoin({
            user: userService.getUserData(),
            settings: siteSettings.resolve(),
            jira: jiraService.init(),
          }).pipe(
            tap(({ user }) => jiraService.updateJira(user?.currentRole)),
            catchError(() => of(false))
          ),
      deps: [UserService, SiteSettingsService, JiraService],
      multi: true,
    },
    { provide: ENV, useValue: environment },

    ...interceptors,
    ...guards,

    LocalStorageService,
    FormService,

    importProvidersFrom(
      NoopAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(routes, {
        useHash: false,
        preloadingStrategy: NoPreloading,
      }),
      ToastrModule.forRoot(),
      NgxWebstorageModule.forRoot({ prefix: 'web', separator: '.' }),
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: MissingTranslationHelper,
        },
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      DialogModule
    ),
  ],
});

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
