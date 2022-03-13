import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonPageLayoutComponent } from './lesson-page-layout/lesson-page-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SwiperModule } from 'swiper/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { LessonPageRouterModule } from './lesson-page-router/lesson-page-router.module';
import { LessonPageSharedModule } from 'src/app/shared/lesson-page-shared/lesson-page-shared.module';
import { SafeHtmlPipe, SingleLessonComponent } from './children/single-lesson/single-lesson.component';
import { LessonPageHomeComponent } from './children/lesson-page-home/lesson-page-home.component';
import { MatListModule } from '@angular/material/list';
import { ParticleBgComponent } from './children/particle-bg/particle-bg.component';
import { EffectsModule } from '@ngrx/effects';
import { LessonInfoEffects } from 'src/app/state/lessoninfo/lessoninfo.effect';
import { ChooseLessonPageComponent } from './children/choose-lesson-page/choose-lesson-page.component';


@NgModule({
  declarations: [
    LessonPageLayoutComponent,
    SingleLessonComponent,
    LessonPageHomeComponent,
    ParticleBgComponent,
    SafeHtmlPipe,
    ChooseLessonPageComponent,
  ],
  imports: [
    CommonModule,
    LessonPageRouterModule,
    LessonPageSharedModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    SwiperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatListModule,
    MatTooltipModule,
    MatChipsModule,
    MatDividerModule,
    EffectsModule.forFeature([
      LessonInfoEffects
    ]),
  ]
})
export class LessonPageModule { }
