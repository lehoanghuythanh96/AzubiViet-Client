import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInventoryEntity } from 'src/app/models/userinventory/userinventory.entity';

@Component({
  selector: 'app-inventory-item-info-card',
  templateUrl: './inventory-item-info-card.component.html',
  styleUrls: ['./inventory-item-info-card.component.scss']
})
export class InventoryItemInfoCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      item: UserInventoryEntity,
      cdnpath: string
    }
  ) { }

  ngOnInit(): void {
  }

}
