import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { ShopItemEntity } from 'src/app/models/shopitem/shopitem.entity';
import { UserEntity } from 'src/app/models/userentity/userinfo.entity';
import { UserInventoryCardComponent } from 'src/app/shared/user-authentication-shared/components/user-inventory-card/user-inventory-card.component';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { environment } from 'src/environments/environment';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';

@Component({
  selector: 'app-item-shop-page',
  templateUrl: './item-shop-page.component.html',
  styleUrls: ['./item-shop-page.component.scss']
})
export class ItemShopPageComponent implements OnInit {

  items: ShopItemEntity[] = []
  cdnpath!: string;

  userinfo!: UserEntity

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    private localService: QuestionMarketLocalService
  ) { }

  ngOnInit(): void {
    this.localService.questionmarketinfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        x => !x || !x.questionmarketinfo.shop_items
      )
    ).subscribe(
      x => {
        this.items = x!.questionmarketinfo.shop_items!
        this.cdnpath = environment.BASE_CDN_URL + '/' + x!.questionmarketinfo.defaultconfig?.shopitem_img_path
        this.userinfo = x!.questionmarketinfo.userinfo!
      }
    )
  }

  openInventory() {
    this.bottomSheet.open(
      UserInventoryCardComponent
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
