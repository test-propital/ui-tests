import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets.component';
import { AssetsListComponent } from './components/assets-list/assets-list.component';
import { SingleAssetComponent } from './components/single-asset/single-asset.component';

const routes: Routes = [
  {path:'',
    component:AssetsComponent,
    children:[
      {
        path:'',
        redirectTo:'assets-list'
      },
      {
        path:'assets-list',
        component:AssetsListComponent
      },
      {
        path:'single-asset/:id',
        component:SingleAssetComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
