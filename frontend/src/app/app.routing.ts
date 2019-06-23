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

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'newdashboard',
        pathMatch: 'full',
    },
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
        component: NewDashboardComponent
    },
    {
        path: 'resumo/:pickup_id',
        component: PickupStatsComponent
    }
]
