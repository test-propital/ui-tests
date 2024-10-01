import { Component, OnInit } from '@angular/core';
import { DynamicNotificationsService } from 'src/app/core/dynamic-notifications.service';

@Component({
  selector: 'app-notifications-dinamic',
  templateUrl: './notifications-dinamic.component.html',
  styleUrls: ['./notifications-dinamic.component.scss']
})
export class NotificationsDinamicComponent implements OnInit {
  

  constructor(private dynamicNotificationsService:DynamicNotificationsService) { }

  ngOnInit(): void {
  }

  close(){
    this.dynamicNotificationsService.destroyComponent()
  }

}
