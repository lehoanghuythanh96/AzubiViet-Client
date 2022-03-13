import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLandingPageLayoutComponent } from './main-landing-page-layout/main-landing-page-layout.component';
import { MainLandingPageRouterModule } from './main-landing-page-router/main-landing-page-router.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LandingPageSharedModule } from 'src/app/shared/landing-page-shared/landing-page-shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { MainLandingPageInfoEffects } from 'src/app/state/mainLandingPage/mainlanding.effect';
import { LandingHomePageComponent } from './children/landing-home-page/landing-home-page.component';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, EffectCoverflow, Mousewheel, Navigation } from 'swiper';
import { MatCardModule } from '@angular/material/card';
import { LandingPanelComponent } from './children/landing-home-page/children/landing-panel/landing-panel.component';
import { ShoppingNavigationComponent } from './children/landing-home-page/children/shopping-navigation/shopping-navigation.component';
import { UserAuthenticationSharedModule } from 'src/app/shared/user-authentication-shared/user-authentication-shared.module';
import { NewestQAndAComponent } from './children/landing-home-page/children/newest-qand-a/newest-qand-a.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QAndABoxComponent } from './children/landing-home-page/children/qand-abox/qand-abox.component';
import { QADialogComponent } from './children/landing-home-page/children/qand-abox/children/qadialog/qadialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RecaptchaModule } from 'ng-recaptcha';
import { QADetailBoxComponent } from './children/landing-home-page/children/qadetail-box/qadetail-box.component';
import { MatListModule } from '@angular/material/list';
import { ControlReportQAQuestionComponent } from './children/landing-home-page/children/qand-abox/children/control-report-qa-question/control-report-qa-question.component';
import { ReportInvalidQAQuestionDialogComponent } from './children/landing-home-page/children/qadetail-box/children/report-invalid-qa-question-dialog/report-invalid-qa-question-dialog.component';
import { ReportInvalidQAAnswerDialogComponent } from './children/landing-home-page/children/qadetail-box/children/report-invalid-qa-answer-dialog/report-invalid-qa-answer-dialog.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { QAImagesFormComponent } from './children/landing-home-page/children/qand-abox/children/qa-images-form/qa-images-form.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { ImageViewerComponent } from './children/image-viewer/image-viewer.component';
import { ParticleBgComponent } from './children/particle-bg/particle-bg.component';

SwiperCore.use([
  Mousewheel,
  EffectCoverflow,
  Autoplay,
  Navigation
]);

@NgModule({
  declarations: [
    MainLandingPageLayoutComponent,
    LandingHomePageComponent,
    LandingPanelComponent,
    ShoppingNavigationComponent,
    NewestQAndAComponent,
    QAndABoxComponent,
    QADialogComponent,
    QADetailBoxComponent,
    ControlReportQAQuestionComponent,
    ReportInvalidQAQuestionDialogComponent,
    ReportInvalidQAAnswerDialogComponent,
    QAImagesFormComponent,
    ImageViewerComponent,
    ParticleBgComponent
  ],
  imports: [
    CommonModule,
    LandingPageSharedModule,
    UserAuthenticationSharedModule,
    RouterModule,
    MatSidenavModule,
    MainLandingPageRouterModule,
    MatButtonModule,
    SwiperModule,
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatChipsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatDialogModule,
    RecaptchaModule,
    MatListModule,
    EffectsModule.forFeature([
      MainLandingPageInfoEffects
    ]),
  ]
})
export class MainLandingPageModule { }
