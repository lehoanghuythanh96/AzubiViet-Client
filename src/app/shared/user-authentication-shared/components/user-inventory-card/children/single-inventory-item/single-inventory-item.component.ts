import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInventoryEntity } from 'src/app/models/userinventory/userinventory.entity';
import { InventoryItemInfoCardComponent } from '../inventory-item-info-card/inventory-item-info-card.component';

@Component({
  selector: 'app-single-inventory-item',
  templateUrl: './single-inventory-item.component.html',
  styleUrls: ['./single-inventory-item.component.scss']
})
export class SingleInventoryItemComponent implements OnInit {

  @Input()
  item!: UserInventoryEntity

  @Input()
  cdnpath!: string;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDescription() {
    const dialogRef = this.dialog.open(
      InventoryItemInfoCardComponent,
      {
        width: '400px',
        data: {
          item: this.item,
          cdnpath: this.cdnpath
        }
      }
    )
  }

}
