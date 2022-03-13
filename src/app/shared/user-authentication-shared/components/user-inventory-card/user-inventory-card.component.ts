import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { UserEntity } from 'src/app/models/userentity/userinfo.entity';
import { UserInventoryEntity } from 'src/app/models/userinventory/userinventory.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-inventory-card',
  templateUrl: './user-inventory-card.component.html',
  styleUrls: ['./user-inventory-card.component.scss']
})
export class UserInventoryCardComponent implements OnInit {

  items?: UserInventoryEntity[]
  cdnpath?: string;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query user_info {
          user_info {
            user_name,
            user_role,
            user_level,
            levelup_points,
            user_abicoin,
            user_experience,
            user_avatar {
              media_name,
              media_path
            },
            gender,
            user_inventory {
              ID,
              item_quantity,
              item_name,
              item_code,
              user_ID,
              item_avatar,
              item_description
            },
            defaultconfig {
              userimg_path,
              shopitem_img_path
            }
          }
        }
      `
    }).valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (x: any) => {
        let userinfo: UserEntity = x.data.user_info
        this.items = userinfo.user_inventory
        this.cdnpath = environment.BASE_CDN_URL + '/' + userinfo.defaultconfig?.shopitem_img_path
      },
      error => {
        console.log(error)
        return
      }
    )
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

}
