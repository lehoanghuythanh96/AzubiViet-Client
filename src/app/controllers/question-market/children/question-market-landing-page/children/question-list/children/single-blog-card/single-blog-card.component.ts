import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { ReportInvalidQuestionDialogComponent } from './children/report-invalid-question-dialog/report-invalid-question-dialog.component';

@Component({
  selector: 'app-single-blog-card',
  templateUrl: './single-blog-card.component.html',
  styleUrls: ['./single-blog-card.component.scss']
})
export class SingleBlogCardComponent implements OnInit {

  answered = false;
  isOwner = false;

  @Input()
  q_data!: PostEntity;

  author_name: any;
  question_avatar: any;
  author_avatar: any;
  cat_list: any;

  question_imgnames: string[] = [];

  get cdnfolder() {
    return this._localService.addquestionproduct.cdnfolder;
  }

  get authorcdnpath() {
    return this._localService.user_img_path;
  }

  isReplying = false;

  constructor(
    private _localService: QuestionMarketLocalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user_id') && this.q_data.post_author == parseInt(localStorage.getItem('user_id')!)) {
      this.isOwner = true;
    }
    let _data = this.q_data;
    this.author_name = _data.author_info.user_name;
    this.question_avatar = _data.question_avatar.media_name
    this.author_avatar = _data.author_info.user_avatar?.media_name
    this.cat_list = this._localService.catList.filter(
      (x: { ID: number, category_name: string }) => _data.post_category.indexOf(x.ID) >= 0
    )
    this.question_imgnames = _data.question_imgs.map(
      y => y.media_name
    )

    if (this.q_data.questionmarket_user_answer && this.q_data.questionmarket_user_answer.find(
      y => y.user_ID == parseInt(localStorage.getItem('user_id')!)
    )) {
      this.answered = true;
    }
  }

  openReportDialog(): void {
    const dialogRef = this.dialog.open(ReportInvalidQuestionDialogComponent, {
      width: '400px',
      data: {
        question_ID: this.q_data.ID
      },
    });
  }

}
