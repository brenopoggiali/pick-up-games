import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
//import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { CardItemComponent }   from './card-item/card-item.component';
import { NewDashboardComponent }   from './new-dashboard/new-dashboard.component';
import { PickupStatsComponent } from './pickup-stats/pickup-stats.component';
import { ChipInComponent } from './chip-in/chip-in.component';
import { GroupComponent } from './group/group.component';
import { PickupGroupsComponent } from './pickup-groups/pickup-groups.component';
<<<<<<< HEAD
import { SmallCardItemComponent } from './small-card-item/small-card-item.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChipInDetailsComponent } from './chip-in-details/chip-in-details.component';
import { StatsComponent } from './stats/stats.component';
import { AuthGuard } from './auth-guards/auth.guards';
import { ScoutJudgeComponent } from './scout-judge/scout-judge.component';
=======
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
>>>>>>> c05a6b4722e9ededa5d55ce51651b36553042b12

export const AppRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    },

    {
        path: 'carditem',
        component: CardItemComponent
    },
    {
        path: 'newdashboard/:param',
        component: NewDashboardComponent

    },
    {
        path: 'newdashboard',
        component: NewDashboardComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'resumo/:pickup_id',
        component: PickupStatsComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'vaquinhas',
        component: ChipInComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'grupos',
        component: PickupGroupsComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'grupo/:group_id',
        component: GroupComponent,
        // canActivate: [AuthGuard]
    },
    {
<<<<<<< HEAD
        path: 'smallcard',
        component: SmallCardItemComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'vaquinha/:chipin_id',
        component: ChipInDetailsComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'historico',
        component: StatsComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: '',
        component: NewDashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'jogo/:pickup_id',
        component: ScoutJudgeComponent,
        // canActivate: [AuthGuard]
=======
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
>>>>>>> c05a6b4722e9ededa5d55ce51651b36553042b12
    }
]
