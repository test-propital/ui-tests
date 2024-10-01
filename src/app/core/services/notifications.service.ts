import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor(private apoService:ApiService) { }

  getNotificationsByUserId(
    page?: number,
    limit?: number,
    onlyRead?: boolean,
    startDate?: string,
    endDate?: string,
    showAll?: boolean,
    onlyUnread?: boolean
): Observable<any> {
    let url = `/notifications/notifications-by-user`;
    const params: string[] = [];

    if (page) {
        params.push(`page=${page}`);
    }

    if (limit) {
        params.push(`limit=${limit}`);
    }

    if (onlyRead ) {
        params.push(`onlyRead=${onlyRead}`);
    }

    if (onlyUnread ) {
        params.push(`onlyUnread=${onlyUnread}`);
    }

    if (startDate) {
      const startDateObj = new Date(startDate);
      if (!isNaN(startDateObj.getTime())) {
          params.push(`startDate=${encodeURIComponent(startDateObj.toISOString())}`);
      } else {
          console.error('Invalid startDate:', startDate);
      }
  }

  if (endDate) {
      const endDateObj = new Date(endDate);
      if (!isNaN(endDateObj.getTime())) {
          params.push(`endDate=${encodeURIComponent(endDateObj.toISOString())}`);
      } else {
          console.error('Invalid endDate:', endDate);
      }
  }

  if (showAll) {
    params.push(`showAll=${showAll}`);
  }

    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }

    return this.apoService.get(url);
  }

  getcountUnreadNotificationsByUserId(): Observable<any>{
    return this.apoService.get("/notifications/count-unread-notifications-by-user")
  }

  markAsRead(body:any): Observable<any>{
    return this.apoService.patch(`/notifications/mark-as-read-by-id`,body)
  }

  markAsReadAll(): Observable<any>{
    return this.apoService.patch(`/notifications/read-all`)
  }
}
