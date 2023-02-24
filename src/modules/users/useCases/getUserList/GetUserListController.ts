import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import {GetUserList} from "./GetUserList";
import {DecodedExpressRequest} from "../../infra/http/models/decodedRequest";
import * as express from "express";
import {GetUserListDTO} from "./GetUserListDTO";

export class GetUserListController extends BaseController {
    private useCase: GetUserList;

    constructor(useCase: GetUserList) {
        super();
        this.useCase = useCase;
    }

    async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
        const dto: GetUserListDTO = {
            count: Number(req.query.offset),
            page: Number(req.query.page),
        }
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                return this.fail(res, error.getErrorValue().message);
            }
            return this.ok(res, {
                users: result
            });
        } catch (err) {
            return this.fail(res, err)
        }
    }
}