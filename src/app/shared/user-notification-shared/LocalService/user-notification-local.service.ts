import { Injectable } from '@angular/core';
import { GuestQandAEntity } from 'src/app/models/guestQandA/guestQandA.entity';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationLocalService {

  constructor(
  ) { }

  allQAs!: GuestQandAEntity[]
  
}
