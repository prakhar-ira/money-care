import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { MatCardModule } from  "@angular/material/card";
import { MatSelectModule } from  "@angular/material/select";
import { MatFormFieldModule } from  "@angular/material/form-field";
import { MatInputModule } from  "@angular/material/input";
import { MatButtonModule } from  "@angular/material/button";
import { MatDialogModule } from  "@angular/material/dialog";
import { AuthGuard } from "./auth.guard";
import { NgxSpinnerModule } from "ngx-spinner";
import { AddSubAdminComponent } from "./dialogs/add-sub-admin/add-sub-admin.component";
import { AddNotificationComponent } from "./dialogs/add-notification/add-notification.component";
import {
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
  CommonModule,
} from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MAT_DATE_LOCALE } from "@angular/material/core";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    AddSubAdminComponent,
    AddNotificationComponent,
  ],
  providers: [
    AuthGuard,
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddSubAdminComponent, AddNotificationComponent],
})
export class AppModule {}
