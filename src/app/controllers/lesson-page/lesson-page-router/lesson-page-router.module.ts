import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonPageLayoutComponent } from '../lesson-page-layout/lesson-page-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { SingleLessonComponent } from '../children/single-lesson/single-lesson.component';
import { LessonPageHomeComponent } from '../children/lesson-page-home/lesson-page-home.component';
import { ChooseLessonPageComponent } from '../children/choose-lesson-page/choose-lesson-page.component';

const routes: Routes = [
  {
    path: '',
    component: LessonPageLayoutComponent,
    children: [
      {
        path: '',
        component: LessonPageHomeComponent
      },
      {
        path: 'single',
        component: SingleLessonComponent
      },
      {
        path: 'chooselesson',
        component: ChooseLessonPageComponent
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
export class LessonPageRouterModule { }
