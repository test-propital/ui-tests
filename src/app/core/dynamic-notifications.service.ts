import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { NotificationsDinamicComponent } from '../main/components/notifications-dinamic/notifications-dinamic.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicNotificationsService {

  constructor() { }

  private notificationComponentRef: ComponentRef<NotificationsDinamicComponent> | null = null;
  
  toggleNotification(container: ViewContainerRef) {
    if (this.notificationComponentRef) {
      this.notificationComponentRef.destroy();
      this.notificationComponentRef = null;
    } else {
      this.notificationComponentRef = container.createComponent(NotificationsDinamicComponent);
    }
  }
  destroyComponent(){
    if (this.notificationComponentRef) {
      this.notificationComponentRef.destroy();
      this.notificationComponentRef = null;
    }
  }
}
