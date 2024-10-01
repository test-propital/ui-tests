import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { AssetsService } from 'src/app/core/services/assets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Owner:any
  counterAssets=0

  constructor(private assetService:AssetsService) { }

  ngOnInit(): void {
    this.getOwnerAssets();
  }
  getOwnerAssets(){
    this.assetService.getOwnerAssetsByUserId().subscribe(data=>{
      this.Owner = data
      console.log(data)
      this.getAssetsCount()
    })
  }
  getAssetsCount(){
    this.assetService.geAssetCountById(this.Owner.id).subscribe(data=>{
      console.log(data)
      this.counterAssets=data
    })
  }

  generateRandomAsset(){
    let body ={
      assetType: "House",
      address: "1234 Elm Street, Springfield",
      value: 250000,
      acquisitionDate: "2023-07-15T00:00:00.000Z",
      rentalIncome: 1500,
      ownerId:  this.Owner.id,
      areaSqm: 120,
      description: "Beautiful 3-bedroom house with a large   garden.",
      status: "Available"
    }
    console.log(body)
    this.assetService.generateRandomAsset(body).subscribe(data=>{
      console.log(data)
    }, error => {
      console.error('Error post asset:', error);
    });
  }
  generateRandomEvent(){
    let body= {
      id:this.Owner.id
    }
    this.assetService.generateRandomEvent(body).subscribe(data=>{
      console.log(data)
      this.getOwnerAssets();
    })
  }

}
