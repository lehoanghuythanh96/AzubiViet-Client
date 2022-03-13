import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QuestionMarketSharedModule } from 'src/app/shared/question-market-shared/question-market-shared.module';
import { QuestionMarketLayoutComponent } from './question-market-layout/question-market-layout.component';
import { QuestionMarketRouterModule } from './question-market-router/question-market-router.module';
import { QuestionMarketLandingPageComponent } from './children/question-market-landing-page/question-market-landing-page.component';
import { NeonPanelComponent } from './children/question-market-landing-page/children/neon-panel/neon-panel.component';
import { AddNewProductComponent } from './children/add-new-product/add-new-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { QuestionMarketInfoEffects } from 'src/app/state/questionmarketinfo/questionmarketinfo.effect';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ParticleBGComponent } from './children/particle-bg/particle-bg.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { QuestionMarketAddCategoryDialogComponent } from './children/add-category-dialog/add-category-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SwiperModule } from 'swiper/angular';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import SwiperCore, { Autoplay, EffectCoverflow, Mousewheel, Navigation } from 'swiper';
import { MatChipsModule } from '@angular/material/chips';
import { NewProductAnswerImgFormComponent } from './children/add-new-product/children/new-product-answer-img-form/new-product-answer-img-form.component';
import { NewProductImageFormComponent } from './children/add-new-product/children/new-product-image-form/new-product-image-form.component';
import { QuestionListComponent } from './children/question-market-landing-page/children/question-list/question-list.component';
import { QuestionFilterComponent } from './children/question-market-landing-page/children/question-list/children/question-filter/question-filter.component';
import { MatTableModule } from '@angular/material/table';
import { ManagePrivateProfilePageComponent } from './children/manage-private-profile-page/manage-private-profile-page.component';
import { PrivateProductManagerTableComponent } from './children/manage-private-profile-page/children/private-product-manager-table/private-product-manager-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { NewProductAvatarFormComponent } from './children/add-new-product/children/new-product-avatar-form/new-product-avatar-form.component';
import { SingleBlogCardComponent } from './children/question-market-landing-page/children/question-list/children/single-blog-card/single-blog-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ProductAnswerCardComponent } from './children/question-market-landing-page/children/product-answer-card/product-answer-card.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { AnswerReviewPageComponent } from './children/answer-review-page/answer-review-page.component';
import { QuestionManagerPageComponent } from './children/manage-private-profile-page/children/question-manager-page/question-manager-page.component';
import { QuillModule } from 'ngx-quill';
import { ImageViewerComponent } from './children/image-viewer/image-viewer.component';
import { NgxViewerModule } from 'ngx-viewer';
import { MatRadioModule } from '@angular/material/radio';
import { FalseOriginalAnswerMessageComponent } from './children/answer-review-page/children/false-original-answer-message/false-original-answer-message.component';
import { QuestionDetailPageComponent } from './children/question-detail-page/question-detail-page.component';
import { CheckReviewPageComponent } from './children/check-review-page/check-review-page.component';
import { AnswerReviewsTableComponent } from './children/manage-private-profile-page/children/answer-reviews-table/answer-reviews-table.component';
import { UpdateReviewQuestionAndAnswerContentDialogComponent } from './children/manage-private-profile-page/children/update-review-question-and-answer-content-dialog/update-review-question-and-answer-content-dialog.component';
import { PrivateUserAnswerTableComponent } from './children/manage-private-profile-page/children/private-user-answer-table/private-user-answer-table.component';
import { MarketPageComponent } from './children/market-page/market-page.component';
import { ReportAnswerDialogComponent } from './children/answer-review-page/children/report-answer-dialog/report-answer-dialog.component';
import { ControlAnswerReportComponent } from './children/control-answer-report/control-answer-report.component';
import { ReportAnswerReviewDialogComponent } from './children/check-review-page/children/report-answer-review-dialog/report-answer-review-dialog.component';
import { ReportInvalidQuestionDialogComponent } from './children/question-market-landing-page/children/question-list/children/single-blog-card/children/report-invalid-question-dialog/report-invalid-question-dialog.component';
import { ControlQuestionReportComponent } from './children/control-question-report/control-question-report.component';
import { UserAuthenticationSharedModule } from 'src/app/shared/user-authentication-shared/user-authentication-shared.module';
import { UserQuestionAnswerChartComponent } from './children/user-question-answer-chart/user-question-answer-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ItemShopPageComponent } from './children/item-shop-page/item-shop-page.component';
import { ShopItemSingleCardComponent } from './children/item-shop-page/children/shop-item-single-card/shop-item-single-card.component';
import { ClearReportBoxComponent } from './children/manage-private-profile-page/children/private-user-answer-table/children/clear-report-box/clear-report-box.component';


SwiperCore.use([
  Mousewheel,
  EffectCoverflow,
  Autoplay,
  Navigation
]);


@NgModule({
  declarations: [
    QuestionMarketLayoutComponent,
    QuestionMarketLandingPageComponent,
    NeonPanelComponent,
    AddNewProductComponent,
    ParticleBGComponent,
    QuestionMarketAddCategoryDialogComponent,
    NewProductAnswerImgFormComponent,
    NewProductImageFormComponent,
    QuestionListComponent,
    QuestionFilterComponent,
    ManagePrivateProfilePageComponent,
    PrivateProductManagerTableComponent,
    NewProductAvatarFormComponent,
    SingleBlogCardComponent,
    ProductAnswerCardComponent,
    AnswerReviewPageComponent,
    QuestionManagerPageComponent,
    ImageViewerComponent,
    FalseOriginalAnswerMessageComponent,
    QuestionDetailPageComponent,
    CheckReviewPageComponent,
    AnswerReviewsTableComponent,
    UpdateReviewQuestionAndAnswerContentDialogComponent,
    PrivateUserAnswerTableComponent,
    MarketPageComponent,
    ReportAnswerDialogComponent,
    ControlAnswerReportComponent,
    ReportAnswerReviewDialogComponent,
    ReportInvalidQuestionDialogComponent,
    ControlQuestionReportComponent,
    UserQuestionAnswerChartComponent,
    ItemShopPageComponent,
    ShopItemSingleCardComponent,
    ClearReportBoxComponent
  ],
  imports: [
    CommonModule,
    QuestionMarketRouterModule,
    UserAuthenticationSharedModule,
    MatSidenavModule,
    QuestionMarketSharedModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    SwiperModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatTooltipModule,
    RecaptchaModule,
    MatDividerModule,
    MatRadioModule,
    NgxViewerModule,
    NgChartsModule,
    MatBottomSheetModule,
    QuillModule.forRoot(),
    EffectsModule.forFeature([
      QuestionMarketInfoEffects
    ]),
  ]
})
export class QuestionMarketModule { }
