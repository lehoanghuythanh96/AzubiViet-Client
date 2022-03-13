import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/controllers/main-landing-page/main-landing-page.module').then(m => m.MainLandingPageModule)
  },
  {
    path: 'learning',
    loadChildren: () => import('src/app/controllers/lesson-page/lesson-page.module').then(m => m.LessonPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/controllers/admin-area/admin-area.module').then(m => m.AdminAreaModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/controllers/user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
  },
  {
    path: 'questionmarket',
    loadChildren: () => import('src/app/controllers/question-market/question-market.module').then(m => m.QuestionMarketModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
