import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input()
  image_names?: string[];

  @Input()
  cdnfolder?: string

  images!: string[];

  constructor(
  ) { }

  ngOnInit(): void {
    if (this.image_names) {
      this.images = this.image_names.map(
        name => {
          return this.cdnfolder + name;
        }
      )
    }
  }

}
