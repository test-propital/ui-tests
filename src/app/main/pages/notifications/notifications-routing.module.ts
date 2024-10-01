import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

const routes: Routes = [
  {path:'',
    component:NotificationsComponent,
    children:[
      {
        path:'',
        redirectTo:'notification-list'
      },
      {
        path:'notification-list',
        component:NotificationListComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
