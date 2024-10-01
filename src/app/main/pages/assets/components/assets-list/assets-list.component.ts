import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/core/services/assets.service';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent implements OnInit {
  ownerId!:string
  assetsList:any
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  constructor(private assesService:AssetsService) { }

  ngOnInit(): void {
    this.assesService.getOwnerAssetsByUserId().subscribe(data=>{
      console.log(data)
      console.log(data)
      this.ownerId = data.id;
      this.getAssets()
    })
  }
  getAssets(){
    this.assesService.geAssetsByUserId(
      this.ownerId,
      this.currentPage,
      this.limit,
    ).subscribe(data=>{
      console.log(data)
      this.assetsList = data.data
      this.totalPages = data.meta.totalPages
    }, error => {
      console.error('Error fetching assets:', error);
    });
  }
  applyFilters() {
    this.currentPage = 1; // Reset page to 1 when filters are applied
    this.getAssets();
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAssets();
    }
  }

}
