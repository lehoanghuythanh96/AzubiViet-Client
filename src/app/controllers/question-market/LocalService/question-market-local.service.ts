import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarketInfoState } from 'src/app/state/questionmarketinfo/questionmarketinfo.reducer';

@Injectable({
  providedIn: 'root'
})
export class QuestionMarketLocalService {

  constructor() { }

  questionmarketinfo$ = new BehaviorSubject<QuestionMarketInfoState | undefined>(undefined)

  openRightSideBar = false;
  openLeftSideBar = false;
  isMobile = false;

  isLargeScreen = false;

  choosed_cat$ = new Subject<number>();
  choosed_editpost$ = new Subject<number>();
  allquestions$ = new BehaviorSubject<PostEntity[]>([]);
  catList: any;

  user_img_path?: string;

  marketpplace: {
    choosed_area: number | null,
    choosed_cat: number | null
  } = {
      choosed_area: null,
      choosed_cat: null
    }

  addquestionproduct: AddQuestionProduct = {
    area_ID: null,
    product_avatar: "",
    productimgs: [],
    answer_imgs: [],
    cdnfolder: "",
    slideratio: 5,
    addoredit: true,
    editpost_ID: null,
    current_productlist: null
  }

  quillModule = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

    ]
  }
}

export interface AddQuestionProduct {
  area_ID: number | null,
  product_avatar: string,
  productimgs: Array<string>,
  answer_imgs: Array<string>,
  cdnfolder: string,
  slideratio: number,
  addoredit: boolean,
  editpost_ID: number | null,
  current_productlist: Array<PostEntity> | null
}
