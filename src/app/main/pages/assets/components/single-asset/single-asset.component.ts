import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetsService } from 'src/app/core/services/assets.service';

@Component({
  selector: 'app-single-asset',
  templateUrl: './single-asset.component.html',
  styleUrls: ['./single-asset.component.scss']
})
export class SingleAssetComponent implements OnInit {
  assetId:any
  asset:any
  constructor(
    private route: ActivatedRoute,
    private assetService:AssetsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.assetId = params['id']
      console.log(this.assetId)
      this.assetService.geAssetById(this.assetId).subscribe(data=>{
        console.log(data)
        this.asset = data
      })

    })
  }

}
