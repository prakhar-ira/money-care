import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AddNewUserComponent } from '../../add-new-user/add-new-user.component';
import { UpdateClientPortfolioComponent } from 'app/update-client-portfolio/update-client-portfolio.component';
import { SelectTabComponent } from 'app/select-tab/select-tab.component';
import { AuthGuard } from 'app/auth.guard';
import { ViewProfileComponent } from 'app/view-profile/view-profile.component';
import { LifeInsuranceComponent } from 'app/life-insurance/life-insurance.component';
import { CorporateComponent } from 'app/corporate/corporate.component';
import { HealthComponent } from 'app/health/health.component';
import { VehicleComponent } from 'app/vehicle/vehicle.component';
import { MfEquityComponent } from 'app/mf-equity/mf-equity.component';
import { OthersComponent } from 'app/others/others.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent,canActivate: [AuthGuard] },
    { path: 'table-list',     component: TableListComponent,canActivate: [AuthGuard] },
    { path: 'typography',     component: TypographyComponent, canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent, canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent, canActivate: [AuthGuard] },
    { path: 'notifications',  component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'upgrade',        component: UpgradeComponent, canActivate: [AuthGuard] },
    { path: 'add-new-user',   component: AddNewUserComponent, canActivate: [AuthGuard] },
    { path: 'update-client-portfolio',   component: UpdateClientPortfolioComponent, canActivate: [AuthGuard] },
    { path: 'select-tab',   component: SelectTabComponent, canActivate: [AuthGuard] },
    { path: 'view-profile', component: ViewProfileComponent, canActivate: [AuthGuard]},
    { path: 'life-insurance', component: LifeInsuranceComponent, canActivate: [AuthGuard]},
    { path: 'corporate', component: CorporateComponent, canActivate: [AuthGuard]},
    { path: 'health', component: HealthComponent, canActivate: [AuthGuard]},
    { path: 'vehicle', component: VehicleComponent, canActivate: [AuthGuard]},
    { path: 'mf-equity', component: MfEquityComponent, canActivate: [AuthGuard]},
    { path: 'others', component: OthersComponent, canActivate: [AuthGuard]}
];
