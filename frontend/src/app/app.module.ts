import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
//import { NguiMapModule} from '@ngui/map';

// import { AngularFireModule } from "angularfire2";
// import { AngularFireAuth } from "angularfire2/auth";

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
//import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { CardItemComponent } from './card-item/card-item.component';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { PickupStatsComponent } from './pickup-stats/pickup-stats.component';
import { ChipInComponent } from './chip-in/chip-in.component';
import { GroupComponent } from './group/group.component';
import { PickupGroupsComponent } from './pickup-groups/pickup-groups.component';
import { SmallCardItemComponent } from './small-card-item/small-card-item.component';
import {HttpClientModule} from '@angular/common/http' 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChipInDetailsComponent } from './chip-in-details/chip-in-details.component';
import { ChipInCardComponent } from './chip-in-card/chip-in-card.component';
import { StatsComponent } from './stats/stats.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from './auth-guards/auth.guards'
import { HttpUtilService } from './services/http-util-service';
import { ScoutJudgeComponent } from './scout-judge/scout-judge.component'


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBpe-z-tArhj19lWx0ZTSOPMPzpNI-YWd0",
  authDomain: "pick-up-games-ufmg.firebaseapp.com",
  databaseURL: "https://pick-up-games-ufmg.firebaseio.com",
  projectId: "pick-up-games-ufmg",
  storageBucket: "",
  messagingSenderId: "708200264695",
  appId: "1:708200264695:web:c942f3ef839fb4d8"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
   // MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CardItemComponent,
    NewDashboardComponent,
    PickupStatsComponent,
    ChipInComponent,
    GroupComponent,
    PickupGroupsComponent,
    SmallCardItemComponent,
    LoginComponent,
    RegisterComponent,
    ChipInDetailsComponent,
    ChipInCardComponent,
    StatsComponent,
    ScoutJudgeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
    //NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  providers: [AuthGuard, HttpUtilService, AngularFireModule, AngularFireAuth],
  bootstrap: [AppComponent]
})

export class AppModule { }