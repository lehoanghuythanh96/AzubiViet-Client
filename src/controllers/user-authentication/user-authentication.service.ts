import { Injectable } from '@nestjs/common';
import { _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';
import { SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { _UserRegisterDataInput } from 'src/models/userauthentication/userauth.entity';

let config = SystemDefaultConfig;

@Injectable()
export class UserAuthenticationService {

    constructor(
    ) { }

    

}
