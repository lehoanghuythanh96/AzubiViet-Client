import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { FetchDataService } from 'src/controllers/fetch-data/fetch-data.service';
import { GqlJwtAuthGuard } from 'src/tools/auth-tools/jwt-auth.guard';
import { JwtCurrentUser } from 'src/tools/auth-tools/user.decorator';
import { _cacheKey } from '../cacheKeys/cacheKeys.entity';
import { SystemDefaultConfig } from '../config/nestconfig.interface';
import { userJWTpayload } from '../userJWTpayload/userJWTpayload.interface';
import { UserPrivateMessageEntity } from './userprivatemessage.entity';

let config = SystemDefaultConfig;

@Resolver(() => [UserPrivateMessageEntity])
export class UserPrivateMessageResolver {
  constructor(private fetchDataService: FetchDataService) {}

  @Query(() => [UserPrivateMessageEntity])
  @UseGuards(GqlJwtAuthGuard)
  async user_private_messages(@JwtCurrentUser() user: userJWTpayload) {
    let _allmsgs = await this.fetchDataService.getAllUserPrivateMessages();
    let _usermsgs = _allmsgs.filter((y) => y.user_ID == user.user_id);

    return _usermsgs;
  }
}
