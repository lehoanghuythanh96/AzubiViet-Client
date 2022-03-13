import { Component, Input, OnInit } from '@angular/core';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input()
  image_names!: string[];

  images!: string[];

  constructor(
    private _localService: QuestionMarketLocalService
  ) { }

  ngOnInit(): void {
    if (this.image_names) {
      this.images = this.image_names.map(
        name => {
          return this._localService.addquestionproduct.cdnfolder + name;
        }
      )
    }
  }

}
