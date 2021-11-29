import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSelectModule } from  "@angular/material/select";
import { MatFormFieldModule } from  "@angular/material/form-field";
import { MatInputModule } from  "@angular/material/input";
import { MatButtonModule } from  "@angular/material/button";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AddNewUserComponent } from 'app/add-new-user/add-new-user.component';
import { UpdateClientPortfolioComponent } from 'app/update-client-portfolio/update-client-portfolio.component';
import { SelectTabComponent } from 'app/select-tab/select-tab.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LifeInsuranceComponent } from 'app/life-insurance/life-insurance.component';
import { OthersComponent } from 'app/others/others.component';
import { VehicleComponent } from 'app/vehicle/vehicle.component';
import { MfEquityComponent } from 'app/mf-equity/mf-equity.component';
import { CorporateComponent } from 'app/corporate/corporate.component';
import { HealthComponent } from 'app/health/health.component';
import { ViewProfileComponent } from 'app/view-profile/view-profile.component';
import { NumberDirective } from 'app/numbersOnly-directive';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatNativeDateModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AddNewUserComponent,
    UpdateClientPortfolioComponent,
    SelectTabComponent,
    LifeInsuranceComponent,
    OthersComponent,
    VehicleComponent,
    MfEquityComponent,
    CorporateComponent,
    HealthComponent,
    ViewProfileComponent,
    NumberDirective

  ]
})

export class AdminLayoutModule { }
