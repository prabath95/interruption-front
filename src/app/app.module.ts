import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './utils/notification.service';
import { AuthGuard } from './utils/auth.guard';
import { SessionService } from './utils/session.service';
import { HttpService } from './utils/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './utils/token.interceptor';
import { LoadingInterceptor } from './utils/loading.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ComponentsModule } from './components/components.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    NotificationService,
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    SessionService,
    HttpService,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true,
      },
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
