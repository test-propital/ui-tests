import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notificationForm: FormGroup;
  notificationList:any
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  constructor(
    private notificationService:NotificationsService,
       private fb: FormBuilder,) {
      this.notificationForm = this.fb.group({
        onlyUnread: [false], 
        onlyRead: [false],
        startDate: [''],
        endDate: [''],
        showAll: [true]
      }); }

  ngOnInit(): void {
    this.getNotifications() 
    this.notificationForm.get('onlyRead')?.valueChanges.subscribe((onlyRead: boolean) => {
      this.updateOnlyUnreadBasedOnOnlyRead(onlyRead);
    });

    this.notificationForm.get('onlyUnread')?.valueChanges.subscribe((onlyUnread: boolean) => {
      this.updateOnlyReadBasedOnOnlyUnread(onlyUnread);
    });

    this.notificationForm.get('showAll')?.valueChanges.subscribe((showAll: boolean) => {
      this.updateOnlyReadBasedOnShowAll(showAll);
    });
  }


  updateOnlyUnreadBasedOnOnlyRead(onlyRead: boolean): void {
    if (onlyRead) {
      this.notificationForm.get('onlyUnread')?.setValue(false);
      this.notificationForm.get('showAll')?.setValue(false);
    }
  }

  updateOnlyReadBasedOnOnlyUnread(onlyUnread: boolean): void {
    if (onlyUnread) {
      this.notificationForm.get('onlyRead')?.setValue(false);
      this.notificationForm.get('showAll')?.setValue(false);
    }
  }

  updateOnlyReadBasedOnShowAll(showAll: boolean): void {
    if (showAll) {
      this.notificationForm.get('onlyRead')?.setValue(false);
      this.notificationForm.get('onlyUnread')?.setValue(false);
    }
  }

  getNotifications(){

      const onlyRead = this.notificationForm.value.onlyRead;
      const onlyUnread = this.notificationForm.value.onlyUnread;

      if (onlyRead && onlyUnread) {

        this.notificationForm.get('onlyUnread')?.setValue(false);
    }
    this.notificationService.getNotificationsByUserId(
      this.currentPage,
      this.limit,
      this.notificationForm.value.onlyRead,
      this.notificationForm.value.startDate,
      this.notificationForm.value.endDate,
      this.notificationForm.value.showAll,
      this.notificationForm.value.onlyUnread
    ).subscribe(data=>{
      console.log(data)
      this.notificationList = data.data
      this.totalPages = data.meta.totalPages
      ;
      this.notificationForm.reset();
    }, error => {
      console.error('Error fetching notifications:', error);
    });
  }
  applyFilters() {
    this.currentPage = 1;
    this.getNotifications();
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getNotifications();
    }
  }

  markAsReadNotification(id:string){
    console.log(id)
    let body={
      id:id
    }
    this.notificationService.markAsRead(body).subscribe(data =>{
      console.log(data)
      this.getNotifications()
      }
    )
  }
  readAll(){

    this.notificationService.markAsReadAll().subscribe(data =>{
      console.log(data)
      this.getNotifications()
      }
    )
  }

}
