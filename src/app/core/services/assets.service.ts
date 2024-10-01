import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private apiService:ApiService) { }

  getOwnerAssetsByUserId(): Observable<any>{
    return this.apiService.get("/assets/owner-assets-by-user")
  }
  geAssetsByUserId(
    id:string,
    page?: number,
    limit?: number,
    ): Observable<any>{
      
    let url =`/assets/assets-by-user-owner/${id}`;
    const params: string[] = [];
    if (page) {
      params.push(`page=${page}`);
    }
  
    if (limit) {
      params.push(`limit=${limit}`);
    }
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    console.log(url);
    return this.apiService.get(url)
  }
  geAssetById(id:number): Observable<any>{
    return this.apiService.get(`/assets/asset-byId/${id}`)
  }
  geAssetCountById(id:number): Observable<any>{
    return this.apiService.get(`/assets/asset-count/${id}`)
  }

  generateRandomAsset(body:any){
    return this.apiService.post('/assets',body)
  }
  generateRandomEvent(body:any){
    return this.apiService.post('/assets/random-event',body)
  }
}
