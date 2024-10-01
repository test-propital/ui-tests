import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NotificationsDinamicComponent } from './components/notifications-dinamic/notifications-dinamic.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    MainComponent,
    NotificationsDinamicComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
