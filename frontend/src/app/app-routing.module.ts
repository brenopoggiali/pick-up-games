import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';

const routes: Routes = [
  { path: "newdashboard/:param", component: NewDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
