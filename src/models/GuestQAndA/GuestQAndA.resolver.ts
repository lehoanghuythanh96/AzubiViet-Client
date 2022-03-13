import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { MediaListEntity } from "../media/media.entity";
import { PostLikeTypes } from "../postLikes/postlike.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { GuestQAndAEntity } from "./GuestQAndA.entity";

@Resolver(() => GuestQAndAEntity)
export class GuestQAndAResolver {

    constructor(
        private _fetchdataService: FetchDataService
    ) { }

    @Query(() => [GuestQAndAEntity])
    async guest_QAs() {

        let _allQAs = await this._fetchdataService.getAllguestQandA_items();

        return _allQAs;

    }

    @ResolveField()
    async like_arr(@Parent() QAItem: GuestQAndAEntity) {

        let allLikes = await this._fetchdataService.getAllpostLikes();

        let foundLike = allLikes.find(
            y => y.parent_ID == QAItem.ID && y.type == PostLikeTypes.QA_Answer 
        )

        if (foundLike) {
            return foundLike.user_array
        } else {
            return []
        }
    }

    @ResolveField(() => [MediaListEntity])
    async QA_imgs(@Parent() GuestQA: GuestQAndAEntity) {
        if (GuestQA.item_type == "question") {

            let _cache = await this._fetchdataService.getall_qanda_IMG();

            let _data = [..._cache.filter(
                y => y.parent_ID == GuestQA.ID
            )]

            return _data

        } else {
            return null
        }
    }

}