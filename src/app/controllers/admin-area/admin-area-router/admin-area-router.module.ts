import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAreaLayoutComponent } from '../admin-area-layout/admin-area-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { AddNewLessonComponent } from '../children/add-new-lesson/add-new-lesson.component';
import { AdminHomePageComponent } from '../children/admin-home-page/admin-home-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAreaLayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomePageComponent
      },
      {
        path: 'createlesson',
        component: AddNewLessonComponent
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
export class AdminAreaRouterModule { }
