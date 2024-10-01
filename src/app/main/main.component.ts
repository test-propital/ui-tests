import { Component, OnChanges, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicNotificationsService } from '../core/dynamic-notifications.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../core/services/socket.service';
import { SessionService } from '../core/services/session.service';
import { NotificationsService } from '../core/services/notifications.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnDestroy  {
  @ViewChild('notificationContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  notificationSubscription!: Subscription;
  notification= false;
  notificationsCounter = 0;
  constructor(
    private dynamicNotification:DynamicNotificationsService,
    private SocketService: SocketService,   
    private notificationService:NotificationsService
   
  ) { }

  ngOnInit(): void {
    // Conectar al WebSocket con el ID de usuario
    this.SocketService.connect();
      this.listenNotifications()
    
  }
  listenNotifications(){
    this.SocketService.listen('notification').subscribe(
      data=>{
        console.log(data)
        this.notification = true
        console.log(this.notification)
        this.notificationService.getcountUnreadNotificationsByUserId().subscribe(data=>{
          console.log(data)
          this.notificationsCounter = data
        })
      }
    )
  }


  toggleNotification() {
    this.dynamicNotification.toggleNotification(this.container);
    if(this.notification){
      this.notification = false
        console.log(this.notification)
    }
  }
  close(){
    this.dynamicNotification.destroyComponent()
    this.notification= false

  }

  ngOnDestroy(): void {
    // Desconectar al destruir el componente
    this.SocketService.disconnect();

    // Desuscribirse de la notificación
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
