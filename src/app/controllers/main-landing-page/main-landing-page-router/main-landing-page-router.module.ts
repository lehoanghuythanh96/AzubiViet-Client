import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLandingPageLayoutComponent } from '../main-landing-page-layout/main-landing-page-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingHomePageComponent } from '../children/landing-home-page/landing-home-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLandingPageLayoutComponent,
    children: [
      {
        path: '',
        component: LandingHomePageComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainLandingPageRouterModule { }
