import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { AssetsListComponent } from './components/assets-list/assets-list.component';
import { SingleAssetComponent } from './components/single-asset/single-asset.component';


@NgModule({
  declarations: [
    AssetsComponent,
    AssetsListComponent,
    SingleAssetComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule
  ]
})
export class AssetsModule { }
