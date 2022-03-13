import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAreaLayoutComponent } from './admin-area-layout/admin-area-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SwiperModule } from 'swiper/angular';
import { QuillModule } from 'ngx-quill';
import { AdminAreaRouterModule } from './admin-area-router/admin-area-router.module';
import { AdminAreaSharedModule } from 'src/app/shared/admin-area-shared/admin-area-shared.module';
import { AdminHomePageComponent } from './children/admin-home-page/admin-home-page.component';
import { AddNewLessonComponent } from './children/add-new-lesson/add-new-lesson.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewAreaDialogComponent } from './children/add-new-lesson/children/new-area-dialog/new-area-dialog.component';
import { AddLessonAreaSelectorComponent } from './children/add-new-lesson/children/add-lesson-area-selector/add-lesson-area-selector.component';
import { AddLessonCategorySelectorComponent } from './children/add-new-lesson/children/add-lesson-category-selector/add-lesson-category-selector.component';
import { AddCategoryDialogComponent } from './children/add-new-lesson/children/add-category-dialog/add-category-dialog.component';
import { ManagePostTableComponent } from './children/add-new-lesson/children/manage-post-table/manage-post-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { AdminInfoEffects } from 'src/app/state/admininfo/admininfo.effect';
import { EffectsModule } from '@ngrx/effects';
import { ExpiredReportsTableComponent } from './children/expired-reports-table/expired-reports-table.component';

@NgModule({
  declarations: [
    AdminAreaLayoutComponent,
    AdminHomePageComponent,
    AddNewLessonComponent,
    NewAreaDialogComponent,
    AddLessonAreaSelectorComponent,
    AddLessonCategorySelectorComponent,
    AddCategoryDialogComponent,
    ManagePostTableComponent,
    ExpiredReportsTableComponent
  ],
  imports: [
    CommonModule,
    AdminAreaRouterModule,
    AdminAreaSharedModule,
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
    MatTooltipModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    QuillModule.forRoot(),
    EffectsModule.forFeature([
      AdminInfoEffects
    ]),
  ]
})
export class AdminAreaModule { }
