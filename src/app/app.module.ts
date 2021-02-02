import { TaskDialogComponent } from './board/task/task-dialog/task-dialog.component';
import { TaskComponent } from './board/task/task.component';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from 'src/assets/services/auth/jwt.interceptor';
import { HomeComponent } from './home/home.component';
import { registerLocaleData } from '@angular/common';
import localeRS from '@angular/common/locales/sr-Latn';
import { StatusDialogComponent } from './board/status-dialog/status-dialog.component';
import { UserComponent } from './user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserDialogComponent } from './user/user-dialog/user-dialog.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDialogComponent } from './project/project-dialog/project-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from 'src/assets/services/snackbar/snackbar-handler';
import { UserPipe } from './pipes/user/user.pipe';
registerLocaleData(localeRS);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    TaskComponent,
    TaskDialogComponent,
    HomeComponent,
    StatusDialogComponent,
    UserComponent,
    UserDialogComponent,
    ProjectComponent,
    ProjectDialogComponent,
    ConfirmationDialogComponent,
    UserPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
  ], entryComponents: [
    TaskDialogComponent
  ],
  providers: [
    CookieService,
    SnackbarService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'sr-Latn' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
